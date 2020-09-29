package interface_test

import (
	"fmt"
	"testing"
	"time"
)

type User interface {
	getName() string
}
type UserImp struct {
	name string
}

func (receiver *UserImp) getName() string {
	return receiver.name
}

func TestInterface(t *testing.T) {
	//var a User
	//a = new(UserImp)
	//t.Logf("%T",a)
	a:=UserImp{"jww"}
	a.name = "wcy"
	b := (a).getName()

	t.Log(b)
}


type IntConv func(op int) int
func timeSpent(inner IntConv) IntConv {
	return func (op int)int{
		start := time.Now()
		ret:=inner(op)
		fmt.Println("time:spent",time.Since(start).Seconds())

		return ret
	}
}
func TestFn(t *testing.T) {
	b := timeSpent(func (op int)int{
		time.Sleep(time.Second*1)
		return op
	})(2)
	t.Log(b)
}
