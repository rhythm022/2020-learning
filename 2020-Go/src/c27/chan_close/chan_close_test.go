package chan_test

import (
	"fmt"
	"testing"
	"time"
)
func isCancelled(cancelChan chan struct{}) bool{
	select {
	case <-cancelChan:
		return true
	default:
		return  false
	}
}

func cancel(cancelChan chan struct{}){
	//cancelChan <- struct{}{}
	close(cancelChan)
}
func TestCancel(t *testing.T) {
	cancelChan := make(chan struct{}, 0)
	for i := 0; i < 5; i++ {
		go func(i int, cancelChan chan struct{}) {
			for {
				if isCancelled(cancelChan) {
					break
				}
				time.Sleep(time.Millisecond * 5)
			}
			fmt.Println(i, " is Cancelled")
		}(i, cancelChan)
	}
	cancel(cancelChan)
	time.Sleep(time.Second * 1)
}
