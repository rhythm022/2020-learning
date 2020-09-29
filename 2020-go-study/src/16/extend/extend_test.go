package extend_test

import (
	"fmt"
	"testing"
)

type Pet struct {
	
}

func (p *Pet) speck()  {
fmt.Print("...")
}

func (p *Pet) speckTo(host string)  {
	p.speck()
	fmt.Println(" ",host)
}


func TestExtend(t *testing.T){
	a := new(Pet)
	a.speckTo("jww")
}

type Dog struct {
	Pet
}

//func (d *Dog) speck()  {
//	d.p.speck()
//}
//func (d *Dog) speckTo(host string)  {
//	d.p.speckTo(host)
//}

func TestExtend2(t *testing.T){
	a := new(Dog)
	a.speckTo("jww")
}


type Code string
type Programmer interface {
	HelloWorld() Code
}
func writeHelloWorld(p Programmer){
	fmt.Printf("%T : %v",p,p.HelloWorld())
}


type Go struct {

}

func (g *Go) HelloWorld() Code {
	return "fmt.printIn(\"hello world\")"
}

type Java struct {

}

func (j *Java) HelloWorld() Code {
	return "System.out.Println(\"hello world\")"
}


func TestPoly(t *testing.T){
	//a:=new(Go)
	//writeHelloWorld(a)
	b:=new(Java)
	writeHelloWorld(b)
}