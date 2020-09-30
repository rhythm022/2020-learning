package chan_test

import (
	"fmt"
	"sync"
	"testing"
)

func dataProducer(ch chan int, wg *sync.WaitGroup) {
	go func() {
		for i := 0; i < 10; i++{
			ch <- i
		}
		close(ch)
		wg.Done()
	}()
}
func dataReceiver(ch chan int, wg *sync.WaitGroup,n int) {
	go func() {
			for {
			if data, ok := <-ch; ok {
				fmt.Println(data,n)
			} else {
				break
			}
		}
		wg.Done()
	}()
}

func TestClose(t *testing.T) {
	var wg sync.WaitGroup
	ch := make(chan int)
	wg.Add(1)
	dataProducer(ch,&wg)
	wg.Add(1)
	dataReceiver(ch,&wg,1)
	wg.Add(1)
	dataReceiver(ch,&wg,2)
	wg.Wait()
}
