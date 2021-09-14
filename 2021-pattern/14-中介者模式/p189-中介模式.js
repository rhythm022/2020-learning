// 中介模式：减少某个对象的依赖的个数
// 一个系统中所有对象都值依赖中介者，中介者在这个系统的中心，中间层所有对象的通信，所有对象之间松耦合。
// 类似机场指挥塔知道方圆十里所有飞机的状态
// 博彩公司知道每一个人的情况，为每一个人计算收一和损失。



// 在中介模式之前，比如5v5的泡泡糖对战，10个对象分别在红蓝两组，每个对象需要依赖其他九个的对象引用，使得在加入战队、死亡或胜利、掉线时，协同状态。


// 中介者拥有所有对象的引用。普通对象只拥有中介者对象引用，只需要给(call)中介者发消息。

// ★程序中有多个状态对象，且某个状态对象的状态变化，会使其他状态对象的状态有所变化。使用中介模式，不直接有自己改变他们的状态，而是call让中介对他们的状态进行改变。

// 中介模式迎合迪米特法则/最少只是原则，保持一个对象的知识最少/依赖最少。
// 因为中介者的职能是为一个类调用其他所有的类，所以中介者对象往往代码量巨大，常常难以维护。
