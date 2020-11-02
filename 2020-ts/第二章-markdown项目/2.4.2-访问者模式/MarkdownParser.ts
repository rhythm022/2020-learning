class HtmlHandler {
    public TextChangeHandler(id: string, output: string): void {
        let markdown = <HTMLTextAreaElement>document.getElementById(id)
        let markdownOutput = <HTMLLabelElement>document.getElementById(output)
        if (markdown) {
            markdown.onkeyup = (e) => {
                if (markdown.value) {
                    markdownOutput.innerHTML = markdown.value
                } else
                    markdownOutput.innerHTML = "<p></p>"
            }
        }
    }
}


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

    private GetTag(tagType:TagType,pattern:string):string{
        let tag = this.tagType.get(tagType);
        if(tag){
            return `${pattern}${tag}>`
        }
        return  `${pattern}p>`
    }
    
    public OpeningTag(tagType:TagType):string{
        return this.GetTag(tagType,'<')
    }

    public ClosingTag(tagType:TagType):string{
        return this.GetTag(tagType,'</')

    }
}

interface MarkdownDocument {
    Add(...content:string[]) :void
    Get() :string
}

class MarkdownDocumentImp implements MarkdownDocument{
    private content:string = ""
    Add(...content:string[]) :void{
        content.forEach(element=>{
            this.content += element
        })
    }


    Get():string{
        return this.content
    }
}


// 因为在解析文档时，我们每次解析一行，所以将使用一个类来代表当前正在处理的行.
// 我们决定不使用简单的字符串来传递当前行，因为现在这个类能够清晰地表明我们的意图：解析当前行
class ParseElement{
    CurrentLine:string = ""
}


//访问者模式使我们能够将算法与算法操作的对象分离开。
// 是根据底层的markdown对通用的ParseElement类应用不同的操作，这最终导致我们创建MarkdownDocument类。如果用户键入的内容将被表示为HTML段落，那么添加的标签将与键入内容代表水平分隔线时不同。访问者模式的约定有两个接口：IVisitor和IVisitable
// Visitor/Visitable这两个接口背后的设计思想是对象将是可访问的，所以当它需要执行相关操作时，就接受访问者，使其能够访问该对象
interface Visitor {
    Visit(token:ParseElement,markdownDocument:MarkdownDocument):void
}

interface Visitable {
    Accept(visitor:Visitor,token:ParseElement,markdownDocument:MarkdownDocument):void
}

abstract class VisitorBase implements Visitor{
    constructor(
        private readonly tagType:TagType,
        private readonly TagTypeToHtml:TagTypeToHtml
    ) { }

    Visit(token:ParseElement,markdownDocument:MarkdownDocument):void{
        markdownDocument.Add(
            this.TagTypeToHtml.OpeningTag(this.tagType),
            token.CurrentLine,
            this.TagTypeToHtml.ClosingTag(this.tagType)
        )
    }
}


//以Header1Visitor为例，这个类只有一个职责：将当前行放到H1标签中，然后添加到markdown文档
class Header1Visitor extends VisitorBase{
    constructor() {
        super(TagType.Header1,new TagTypeToHtml());
    }
}


class Header2Visitor extends VisitorBase{
    constructor() {
        super(TagType.Header2,new TagTypeToHtml());
    }
}

class Header3Visitor extends VisitorBase{
    constructor() {
        super(TagType.Header3,new TagTypeToHtml());
    }
}

class ParagraphVisitor extends VisitorBase{
    constructor() {
        super(TagType.Paragraph,new TagTypeToHtml());
    }
}

class HorizontalRuleVisitor extends VisitorBase{
    constructor() {
        super(TagType.HorizontalRule,new TagTypeToHtml());
    }
}


class Visitable implements Visitable{
    Accept(visitor: Visitor, token: ParseElement, markdownDocument: MarkdownDocument):void {
        visitor.Visit(token,markdownDocument)
    }
}













