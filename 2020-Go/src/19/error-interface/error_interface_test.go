package error_test

import (
	"errors"
	"testing"
)
var LargerThanHundredError = errors.New("a should be smaller than 100")
var SmallerThanZeroError = errors.New("a should be larger than 0")
func Fabou(a int) ([]int, error) {
	if a < 0 {
		return nil, SmallerThanZeroError
	}
	if  a > 100{
		return nil, LargerThanHundredError
	}
	tmp:= []int{}
	return tmp,nil
}

func  TestF(t *testing.T)  {


	if v,err := Fabou(110);err !=nil{
		if err == LargerThanHundredError{
			t.Log("L")
		}
		if err == SmallerThanZeroError{
			t.Log("S")
		}
	}else{
		t.Log(v)
	}
}