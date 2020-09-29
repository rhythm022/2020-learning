package share_mem_test

import (
	"fmt"
	"sync"
	"testing"
)

func TestGoroutine(t *testing.T) {
	var mut sync.Mutex
	var wait sync.WaitGroup
	count:= 0
	for i := 0; i < 5000; i++ {

		wait.Add(1)

		go func(i int) {
			defer func() {
				mut.Unlock()
				wait.Done()

			}()
			mut.Lock()
			count++
		}(i)

	}


	//time.Sleep(time.Millisecond * 50)

	wait.Wait()
	fmt.Println(count)
}
