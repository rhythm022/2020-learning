package panic_test

import (
	"errors"
	"fmt"
	"testing"
)

func TestPanicVSExit(t *testing.T)  {
	defer func() {
		if err:=recover(); err!= nil{
			fmt.Println(err)
		}


		fmt.Println("defer panic")
	}()

	fmt.Println("start")

	panic(errors.New("something wrong"))
	//os.Exit(-1)
}


func Re(n int)int{
	if n == 1{
		return 1
	}

	return Re(n-1) + 1

}
func TestRecursion(t *testing.T){
	a :=Re(15)

	t.Log(a)
}

//int f(int n) {
//if (n == 1) return 1;
//return f(n-1) + 1;
//}