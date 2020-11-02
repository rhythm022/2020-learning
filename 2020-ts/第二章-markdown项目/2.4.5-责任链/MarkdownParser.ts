// class HtmlHandler {
//     public TextChangeHandler(id: string, output: string): void {
//         let markdown = <HTMLTextAreaElement>document.getElementById(id)
//         let markdownOutput = <HTMLLabelElement>document.getElementById(output)
//         if (markdown) {
//             markdown.onkeyup = (e) => {
//                 if (markdown.value) {
//                     markdownOutput.innerHTML = markdown.value
//                 } else
//                     markdownOutput.innerHTML = "<p></p>"
//             }
//         }
//     }
// }


enum TagType {
    Header1,
    Header2,
    Header3,
    HorizontalRule,
    Paragraph
}

// 起初，对类型使用readonly可能会让你感到困惑。这个关键字的含义是，当实例化类以后，就不能在该类中的其他位置重新创建tagType。这意味着我们能够安全地在构造函数中设置映射，后面不会调用this.tagType = new Map<TagType, string>();。
// TagTypeToHtml类的单一职责是将tagType映射到HTML标签
class TagTypeToHtml {
    private readonly tagType: Map<TagType, string> = new Map()

    constructor() {
        this.tagType.set(TagType.Header1, "h1");
        this.tagType.set(TagType.Header2, "h2");
        this.tagType.set(TagType.Header3, "h3");
        this.tagType.set(TagType.Paragraph, "p");
        this.tagType.set(TagType.HorizontalRule, "hr");
    }

    private GetTag(tagType: TagType, pattern: string): string {
        let tag = this.tagType.get(tagType);
        if (tag) {
            return `${pattern}${tag}>`
        }
        return `${pattern}p>`
    }

    public OpeningTag(tagType: TagType): string {
        return this.GetTag(tagType, '<')
    }

    public ClosingTag(tagType: TagType): string {
        return this.GetTag(tagType, '</')

    }
}

interface MarkdownDocument {
    Add(...content: string[]): void

    Get(): string
}

class MarkdownDocumentImp implements MarkdownDocument {
    private content: string = ""

    Add(...content: string[]): void {
        content.forEach(element => {
            this.content += element
        })
    }


    Get(): string {
        return this.content
    }
}


// 因为在解析文档时，我们每次解析一行，所以将使用一个类来代表当前正在处理的行.
// 我们决定不使用简单的字符串来传递当前行，因为现在这个类能够清晰地表明我们的意图：解析当前行
class ParseElement {
    CurrentLine: string = ""
}


//访问者模式使我们能够将算法与算法操作的对象分离开。
// 是根据底层的markdown对通用的ParseElement类应用不同的操作，这最终导致我们创建MarkdownDocument类。如果用户键入的内容将被表示为HTML段落，那么添加的标签将与键入内容代表水平分隔线时不同。访问者模式的约定有两个接口：IVisitor和IVisitable
// Visitor/Visitable这两个接口背后的设计思想是对象将是可访问的，所以当它需要执行相关操作时，就接受访问者，使其能够访问该对象
interface Visitor {
    Visit(token: ParseElement, markdownDocument: MarkdownDocument): void
}

interface Visitable {
    Accept(visitor: Visitor, token: ParseElement, markdownDocument: MarkdownDocument): void
}

abstract class VisitorBase implements Visitor {
    constructor(
        private readonly tagType: TagType,
        private readonly TagTypeToHtml: TagTypeToHtml
    ) {
    }

    // => OpeningTag/ClosingTag/Add
    Visit(token: ParseElement, markdownDocument: MarkdownDocument): void {
        markdownDocument.Add(
            this.TagTypeToHtml.OpeningTag(this.tagType),
            token.CurrentLine,
            this.TagTypeToHtml.ClosingTag(this.tagType)
        )
    }
}


//以Header1Visitor为例，这个类只有一个职责：将当前行放到H1标签中，然后添加到markdown文档
class Header1Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header1, new TagTypeToHtml());
    }
}


class Header2Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header2, new TagTypeToHtml());
    }
}

class Header3Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header3, new TagTypeToHtml());
    }
}

class ParagraphVisitor extends VisitorBase {
    constructor() {
        super(TagType.Paragraph, new TagTypeToHtml());
    }
}

class HorizontalRuleVisitor extends VisitorBase {
    constructor() {
        super(TagType.HorizontalRule, new TagTypeToHtml());
    }
}

// => Visit
class Visitable implements Visitable {
    Accept(visitor: Visitor, token: ParseElement, markdownDocument: MarkdownDocument): void {
        visitor.Visit(token, markdownDocument)
    }
}


abstract class Handler<T> {
    protected next: Handler<T> | null = null;

    public SetNext(next: Handler<T>): void {
        this.next = next
    }

    // => Handle
    public HandleRequest(request: T): void {
        if (!this.Handle(request)) {// 进行处理，若无法处理，传递下去
            if (this.next) {
                this.next.HandleRequest(request)
            }
            return
        }
    }

    protected abstract Handle(request: T): boolean
}


class ParseChainHandler extends Handler<ParseElement> {
    private readonly visitable: Visitable = new Visitable()

    constructor(
        private readonly document: MarkdownDocument,
        private readonly tagType: string,// 如#
        private readonly visitor: Visitor,// 如果有匹配的标签，指定的访问者将会访问类
    ) {
        super();
    }

    // => Accept
    protected Handle(request: ParseElement): boolean {
        let split = new LineParser().Parse(request.CurrentLine, this.tagType) // request.CurrentLine
        if (split[0]) {
            request.CurrentLine = split[1] // 替换/覆盖request.CurrentLine
            this.visitable.Accept(this.visitor, request, this.document) // 在ParseChainHandler这里耦合了document:MarkdownDocument
        }

        return split[0]
    }
}

class LineParser {//它能够帮助我们解析当前行，并判断当前行的开始位置是否存在标签。
    public Parse(value: string, tag: string): [boolean, string] {
        let output: [boolean, string] = [false, ""]
        output[1] = value
        if (value === "")
            return output
        let split = value.startsWith(`${tag}`)
        if (split) {
            output[0] = true
            output[1] = value.substr(tag.length)
        }
        return output //其第一个参数指出是否存在标签，如果存在标签，第二个参数包含移除标签后的文本。
    }
}

// 我们知道段落没有关联的标签。如果类链中没有匹配的标签，则默认该文本是一个段落。
class ParagraphHandler extends Handler<ParseElement> {
    private readonly visitable: Visitable = new Visitable();
    private readonly visitor: Visitor = new ParagraphVisitor();

    constructor(
        private readonly document: MarkdownDocument
    ) {
        super();
    }

    protected Handle(request: ParseElement): boolean {
        this.visitable.Accept(this.visitor, request, this.document)

        return true
    }

}


class Header1ChainHandler extends ParseChainHandler {
    constructor(document: MarkdownDocument) {
        super(document, '# ', new Header1Visitor());
    }
}

class Header2ChainHandler extends ParseChainHandler {
    constructor(document: MarkdownDocument) {
        super(document, '## ', new Header2Visitor());
    }
}

class Header3ChainHandler extends ParseChainHandler {
    constructor(document: MarkdownDocument) {
        super(document, '### ', new Header3Visitor());
    }
}

class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document: MarkdownDocument) {
        super(document, '---', new HorizontalRuleVisitor());
    }
}

// 我们使用一个独立的类来构建链
class ChainOfResponsibilityFactory {
    Build(document: MarkdownDocument): ParseChainHandler {
        let header1: Header1ChainHandler = new Header1ChainHandler((document))
        let header2: Header2ChainHandler = new Header2ChainHandler((document))
        let header3: Header3ChainHandler = new Header3ChainHandler((document))
        let horizontalRule: HorizontalRuleHandler = new HorizontalRuleHandler((document))
        let paragraph: ParagraphHandler = new ParagraphHandler((document))

        header1.SetNext(header2)
        header2.SetNext(header3)
        header3.SetNext(horizontalRule)
        horizontalRule.SetNext(paragraph)

        return header1
    }
}


class Markdown {
    // => HandleRequest/document.Get
    public ToHtml(text: string): string {
        let document: MarkdownDocument = new MarkdownDocumentImp()// 新的MarkdownDocument
        let header1: Header1ChainHandler = new ChainOfResponsibilityFactory().Build(document)// 新的ChainHandler

        let lines: string[] = text.split(`\n`)

        for (let i = 0; i < lines.length; i++) {
            let parseElement: ParseElement = new ParseElement()
            parseElement.CurrentLine = lines[i]
            header1.HandleRequest(parseElement)
        }
        // 该ToHtml方法没有set document，只最后在这里Get document
        return document.Get()
    }
}


class HtmlHandler {
    private markdownChange: Markdown = new Markdown()

    // => RenderHtmlContent
    public TextChangeHandler(id: string, outputId: string): void {
        let markdown = <HTMLTextAreaElement>document.getElementById(id)
        let markdownOutput = <HTMLLabelElement>document.getElementById(outputId)

        if (markdown) {
            markdown.onkeyup = () => {
                this.RenderHtmlContent(markdown, markdownOutput)
            }
            window.onload = () => {
                this.RenderHtmlContent(markdown, markdownOutput)
            }
        }
    }

    // => ToHtml
    private RenderHtmlContent(markdown: HTMLTextAreaElement, markdownOutput: HTMLLabelElement) {
        if (markdown.value) {
            // 把markdown.value做转换后，替换/覆盖markdownOutput.innerHTML
            markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value)
        } else {
            markdownOutput.innerHTML = "<p></p>"
        }
    }
}















