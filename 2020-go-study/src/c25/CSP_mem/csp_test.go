package concurrency

import (
	"fmt"
	"testing"
	"time"
)

func WorkingOne() string {
	fmt.Println("Working One")

	time.Sleep(time.Millisecond * 500)

	fmt.Println("Working One is done.")
	return "something"
}

func WorkingTwo() {
	fmt.Println("Working Two")

	time.Sleep(time.Millisecond * 3000)

	fmt.Println("Working Two is done.")
}

//func AsyncWorkingOne() chan string {
//	channel := make(chan string, 1)
//
//	go func() {
//		sth := WorkingOne()
//		fmt.Println("A")
//		channel <- sth
//		fmt.Println("B")
//	}()
//	return channel
//}

func TestAsync(t *testing.T) {
	channel := make(chan string)

	go func() {
		sth := WorkingOne()
		fmt.Println("A")
		channel <- sth
		fmt.Println("B")
	}()

	WorkingTwo()

	fmt.Println(<-channel)

	time.Sleep(time.Second * 100)
}