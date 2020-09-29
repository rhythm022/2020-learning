package empty_interface_test

import (
	"fmt"
	"testing"
)

func Do(a interface{}){
	//if res,ok := a.(int);ok{
	//	fmt.Println(res)
	//	return
	//}
	//fmt.Println("unknown")

	switch v := a.(type) {
	case int:
			fmt.Println("int",v)
	case string:
		fmt.Println("string",v)
	default:
		fmt.Println("unknown")

	}
}

func TestEmptyInterface(t *testing.T){
	Do("10")
}