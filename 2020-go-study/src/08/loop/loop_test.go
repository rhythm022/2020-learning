package loop_test

import "testing"

func TestWhileLoop(t *testing.T) {
	n := 0

	for n < 5 {
		t.Log(n)
		n++
	}
}

func TestIfMultiSec(t *testing.T) {
	if a := 1; a == 1 {

		t.Log(a)
	} else {
		t.Log(2)

	}
}

func TestSwitchMultiCase(t *testing.T) {
	for i := 0; i < 5; i++ {
		switch i {
		case 1,3:
			t.Log("Even")
		case 2,0:
			t.Log("Odd")
		default:
			t.Log("not 0-3")

		}
	}
}


func TestSwitchMultiCase2(t *testing.T) {
	for i := 0; i < 5; i++ {
		switch  {
		case i%2 == 1:
			t.Log("Even")
		case i%2 == 0:
			t.Log("Odd")
		default:
			t.Log("unknown")

		}
	}
}
