package select_test

import (
	"fmt"
	"testing"
	"time"
)

func WorkingOne() string {
	fmt.Println("Working One")

	time.Sleep(time.Millisecond * 2000)

	fmt.Println("Working One is done.")
	return "something"
}

//func WorkingTwo() {
//	fmt.Println("Working Two")
//
//	time.Sleep(time.Millisecond * 3000)
//
//	fmt.Println("Working Two is done.")
//}

func AsyncWorkingOne() chan string {
	channel := make(chan string, 1)

	go func() {
		sth := WorkingOne()
		fmt.Println("A")
		channel <- sth
		fmt.Println("B")
	}()
	return channel
}

func TestSelect(t *testing.T) {
	select {
	case res := <-AsyncWorkingOne():
		fmt.Println(res)
	case <-time.After(time.Millisecond * 1000):
		t.Error("time out")
	}
}
