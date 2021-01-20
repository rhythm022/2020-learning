package array_test

import "testing"

func TestWhileLoop(t *testing.T) {
	//var a [1]int
	//t.Log(a)
	//
	//a[0] = 3
	//t.Log(a)

	a := [...]int{1, 2, 3}
	t.Log(a)

	b := [3][3]int{{1, 2, 3}}
	t.Log(b)

}



func TestArrayTravel(t *testing.T) {
	a := [...]int{1, 2, 3}

for i,v := range a {
	t.Log(i,v)
}

}


func TestArraySection(t *testing.T) {
	a := [...]int{1, 2, 3,4,5}

	a_sec := a[3:]

	a_sec[1] = 1000
	t.Log(a_sec,a)
}