package func_test

import (
	"fmt"
	"math/rand"
	"testing"
	"time"
)

func returnMulti() (int, int) {
	return rand.Intn(11), rand.Intn(55)
}

func timeSpent(inner func(op int) int) func(op int) int {
	return func (op int)int{
		start := time.Now()
		ret:=inner(op)
		fmt.Println("time:spent",time.Since(start).Seconds())

		return ret
	}
}
func TestFn(t *testing.T) {
	a, b := returnMulti()
	t.Log(a, b)
}


func TestFn2(t *testing.T) {


	//slowFn := func (op int)int{
	//	return op
	//}
	 b := timeSpent(func (op int)int{
	 	time.Sleep(time.Second*1)
		 return op
	 })(2)
	t.Log(b)
}


func sum(op ...int)int{
	ret:= 0
	for _,a:= range op{
		ret += a
	}

	return ret
}

func TestVarParam(t *testing.T){
	t.Log(
		sum(1,2,34),
		)
}


func clear(){
	fmt.Println("clear resources")
}
func TestDefer(t *testing.T){
	fmt.Println("start")
	defer clear()
	panic("panic")

}