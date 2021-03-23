
const RENDER_TO_DOM = Symbol('render_to_dom')

class Component {// vdom的比对逻辑再组件类里实现
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
    this._range = null

  }
  get vdom() {
    return this.render().vdom
  }
  // get vchildren() {
  //   return this.children.map(child => child.vdom)
  // }
  setAttribute(name, value) {
    this.props[name] = value
  }

  appendChild(component) {
    this.children.push(component)
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    this._vdom = this.vdom;// RENDER_TO_DOM/虚dom转实dom前把虚dom存下来
    this._vdom[RENDER_TO_DOM](range)
  }
  update() {
    const isSameNode = (oldNode, newNode) => {
      if (oldNode.type !== newNode.type) return false

      for (const name in newNode.props) {
        if (newNode.props[name] !== oldNode.props[name])
          return false
      }

      if (Object.keys(newNode.props).length !== Object.keys(oldNode.props).length)
        return false

      if (newNode.type === '#text') {
        if (newNode.content !== oldNode.content) return false
      }
      return true
    }
    let update = (oldNode, newNode) => {
      if (!isSameNode(oldNode, newNode)) {
        newNode[RENDER_TO_DOM](oldNode._range)
        return
      }
      newNode._range = oldNode._range
      const newChildren = newNode.vchildren
      const oldChildren = oldNode.vchildren

      if (!newChildren || !newChildren.length) return
      let tailRange = oldChildren[oldChildren.length - 1]._range
      for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const oldChild = oldChildren[i]

        if (i < oldChildren.length) {
          update(oldChild, newChild)
        } else {
          let range = document.createRange()
          range.setStart(tailRange.endContainer, tailRange.endOffset)
          range.setEnd(tailRange.endContainer, tailRange.endOffset)
          newChild[RENDER_TO_DOM](range)
          tailRange = range
        }

      }
    }

    let vdom = this.vdom
    update(this._vdom, vdom)
    this._vdom = vdom
  }

  /*
  rerender() {
    let oldRange = this._range

    let range = document.createRange()
    range.setStart(oldRange.startContainer, oldRange.startOffset)
    range.setEnd(oldRange.startContainer, oldRange.startOffset)

    this[RENDER_TO_DOM](range)

    oldRange.setStart(range.endContainer, range.endOffset)
    oldRange.deleteContents()

  }
 */
  setState(newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState

      this.update()

      return
    }

    let merge = (oldState, newState) => {
      for (const name in newState) {
        if (oldState[name] === null || typeof oldState[name] !== 'object') {

          oldState[name] = newState[name]

        } else {
          merge(oldState[name], newState[name])
        }
      }

    }

    merge(this.state, newState)
    this.update()

  }


}

class ElementWrapper extends Component {
  constructor(tagName) {
    super()
    this.type = tagName
  }
  get vdom() {
    this.vchildren = this.children.map(child => child.vdom)
    return this/*{
      type: this.tagName,
      props: this.props,
      children: this.children.map(child => child.vdom)
    }*/
  }

  [RENDER_TO_DOM](range) {
    this._range = range


    const root = document.createElement(this.type)

    for (const name in this.props) {
      const value = this.props[name]
      if (name.match(/^on([\s\S]+)$/)) {
        root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value)
      } else {
        if (name === 'className') {
          root.setAttribute('class', value)

        } else {
          root.setAttribute(name, value)

        }

      }
    }

    if (!this.vchildren)
      this.vchildren = this.children.map(child => child.vdom)

    for (const child of this.vchildren) {
      let childRange = document.createRange()
      childRange.setStart(root, root.childNodes.length)
      childRange.setEnd(root, root.childNodes.length)

      child[RENDER_TO_DOM](childRange)
    }
    replaceContent(range, root)
  }

}

class TextWrapper extends Component {
  constructor(content) {
    super()
    this.type = '#text'
    this.content = content
  }
  get vdom() {
    return this/*{
      type: '#text',
      content: this.content,
    }*/
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    const root = document.createTextNode(this.content)
    replaceContent(range, root)

  }
}

function replaceContent(range, node) {
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()

  range.setStartBefore(node)
  range.setEndAfter(node)
}

function h(tagName, attributes, ...children) {
  let el = (function () {
    if (typeof tagName === 'string') {
      return new ElementWrapper(tagName)
    } else {
      return new tagName
    }
  })()

  for (let p in attributes) {
    el.setAttribute(p, attributes[p])
  }

  const append = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      if (child === null) {
        continue
      }
      if (typeof child === 'object' && child instanceof Array) {
        append(child)
      } else {
        el.appendChild(child)
      }

    }
  }

  append(children)


  return el
}


function render(component, parentElement) {
  let range = document.createRange()
  range.setStart(parentElement, 0)
  range.setEnd(parentElement, parentElement.childNodes.length)
  range.deleteContents()

  component[RENDER_TO_DOM](range)
}


class Square extends Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}




class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

render(<Game />, document.getElementById("root"));
// const game = <Game />
// console.log(game.vdom)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
