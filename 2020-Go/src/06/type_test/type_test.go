package type_test

import "testing"


type MyInt int64
func TestImplicit(t *testing.T){
	//var a int32 = 1
	var a int = 1
	var b int64
	var c MyInt
	b = int64(a)
	c= MyInt(a)


	t.Log(a,b,c)
}


func TestPoint(t * testing.T){
	a := 1
	aPtr := &a
	//aPtr = aPtr + 1

	t.Logf("%T %T",a,aPtr)
}


func TestString(t *testing.T){
	var a string
	t.Log("*" +a+"*")
	t.Log(len(a))

	if a == "" {
		t.Log("hhh")

	}



}