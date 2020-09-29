package operator_test

import "testing"

func TestCompareArray(t *testing.T) {
	a := [...]int{1, 2, 43}
	b := [...]int{1, 2, 43}
	c := [...]int{1, 43, 43}
	//d := [...]int{1,2,43,1}

	t.Log(
		a == b,
		a == c,
		//a ==  d,
	)
}

const (
	Writable = 1 << iota
	Readable
	Executable
)

func TestClearBit(t *testing.T) {
	a := 7 //0111
	a = a &^ Writable
	t.Log(
		a&Writable == Writable,
		a&Readable == Readable,
		a&Executable == Executable,
	)

}
