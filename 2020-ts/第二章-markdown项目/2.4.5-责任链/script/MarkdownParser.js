"use strict";
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
var TagType;
(function (TagType) {
    TagType[TagType["Header1"] = 0] = "Header1";
    TagType[TagType["Header2"] = 1] = "Header2";
    TagType[TagType["Header3"] = 2] = "Header3";
    TagType[TagType["HorizontalRule"] = 3] = "HorizontalRule";
    TagType[TagType["Paragraph"] = 4] = "Paragraph";
})(TagType || (TagType = {}));
// 起初，对类型使用readonly可能会让你感到困惑。这个关键字的含义是，当实例化类以后，就不能在该类中的其他位置重新创建tagType。这意味着我们能够安全地在构造函数中设置映射，后面不会调用this.tagType = new Map<TagType, string>();。
// TagTypeToHtml类的单一职责是将tagType映射到HTML标签
class TagTypeToHtml {
    constructor() {
        this.tagType = new Map();
        this.tagType.set(TagType.Header1, "h1");
        this.tagType.set(TagType.Header2, "h2");
        this.tagType.set(TagType.Header3, "h3");
        this.tagType.set(TagType.Paragraph, "p");
        this.tagType.set(TagType.HorizontalRule, "hr");
    }
    GetTag(tagType, pattern) {
        let tag = this.tagType.get(tagType);
        if (tag) {
            return `${pattern}${tag}>`;
        }
        return `${pattern}p>`;
    }
    OpeningTag(tagType) {
        return this.GetTag(tagType, '<');
    }
    ClosingTag(tagType) {
        return this.GetTag(tagType, '</');
    }
}
class MarkdownDocumentImp {
    constructor() {
        this.content = "";
    }
    Add(...content) {
        content.forEach(element => {
            this.content += element;
        });
    }
    Get() {
        return this.content;
    }
}
// 因为在解析文档时，我们每次解析一行，所以将使用一个类来代表当前正在处理的行.
// 我们决定不使用简单的字符串来传递当前行，因为现在这个类能够清晰地表明我们的意图：解析当前行
class ParseElement {
    constructor() {
        this.CurrentLine = "";
    }
}
class VisitorBase {
    constructor(tagType, TagTypeToHtml) {
        this.tagType = tagType;
        this.TagTypeToHtml = TagTypeToHtml;
    }
    Visit(token, markdownDocument) {
        markdownDocument.Add(this.TagTypeToHtml.OpeningTag(this.tagType), token.CurrentLine, this.TagTypeToHtml.ClosingTag(this.tagType));
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
class Visitable {
    Accept(visitor, token, markdownDocument) {
        visitor.Visit(token, markdownDocument);
    }
}
class Handler {
    constructor() {
        this.next = null;
    }
    SetNext(next) {
        this.next = next;
    }
    HandleRequest(request) {
        if (!this.CanHandle(request)) {
            if (this.next) {
                this.next.HandleRequest(request);
            }
            return;
        }
    }
}
class ParseChainHandler extends Handler {
    constructor(document, tagType, // 如#
    visitor) {
        super();
        this.document = document;
        this.tagType = tagType;
        this.visitor = visitor;
        this.visitable = new Visitable();
    }
    CanHandle(request) {
        let split = new LineParser().Parse(request.CurrentLine, this.tagType);
        if (split[0]) {
            request.CurrentLine = split[1];
            this.visitable.Accept(this.visitor, request, this.document);
        }
        return split[0];
    }
}
class LineParser {
    Parse(value, tag) {
        let output = [false, ""];
        output[1] = value;
        if (value === "")
            return output;
        let split = value.startsWith(`${tag}`);
        if (split) {
            output[0] = true;
            output[1] = value.substr(tag.length);
        }
        return output; //其第一个参数指出是否存在标签，如果存在标签，第二个参数包含移除标签后的文本。
    }
}
// 我们知道段落没有关联的标签。如果类链中没有匹配的标签，则默认该文本是一个段落。
class ParagraphHandler extends Handler {
    constructor(document) {
        super();
        this.document = document;
        this.visitable = new Visitable();
        this.visitor = new ParagraphVisitor();
    }
    CanHandle(request) {
        this.visitable.Accept(this.visitor, request, this.document);
        return true;
    }
}
class Header1ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '# ', new Header1Visitor());
    }
}
class Header2ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '## ', new Header2Visitor());
    }
}
class Header3ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '### ', new Header3Visitor());
    }
}
class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '---', new HorizontalRuleVisitor());
    }
}
// 我们使用一个独立的类来构建链
class ChainOfResponsibilityFactory {
    Build(document) {
        let header1 = new Header1ChainHandler((document));
        let header2 = new Header2ChainHandler((document));
        let header3 = new Header3ChainHandler((document));
        let horizontalRule = new HorizontalRuleHandler((document));
        let paragraph = new ParagraphHandler((document));
        header1.SetNext(header2);
        header2.SetNext(header3);
        header3.SetNext(horizontalRule);
        horizontalRule.SetNext(paragraph);
        return header1;
    }
}
class Markdown {
    ToHtml(text) {
        let document = new MarkdownDocumentImp();
        let header1 = new ChainOfResponsibilityFactory().Build(document);
        let lines = text.split(`\n`);
        for (let i = 0; i < lines.length; i++) {
            let parseElement = new ParseElement();
            parseElement.CurrentLine = lines[i];
            header1.HandleRequest(parseElement);
        }
        return document.Get();
    }
}
class HtmlHandler {
    constructor() {
        this.markdownChange = new Markdown();
    }
    TextChangeHandler(id, outputId) {
        let markdown = document.getElementById(id);
        let markdownOutput = document.getElementById(outputId);
        if (markdown) {
            markdown.onkeyup = () => {
                this.RenderHtmlContent(markdown, markdownOutput);
            };
            window.onload = () => {
                this.RenderHtmlContent(markdown, markdownOutput);
            };
        }
    }
    RenderHtmlContent(markdown, markdownOutput) {
        if (markdown.value) {
            markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
        }
        else {
            markdownOutput.innerHTML = "<p></p>";
        }
    }
}
//# sourceMappingURL=MarkdownParser.js.map