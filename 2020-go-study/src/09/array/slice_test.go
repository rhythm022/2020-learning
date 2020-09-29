package slice_test

import "testing"






func TestSliceInit(t *testing.T) {
	a := []int{1, 2}
	a_sec  := a[1:]
	//b_sec  := a[1:]

	a = append(a,3)
	t.Log(a,len(a),cap(a))
	t.Log(a_sec,len(a_sec),cap(a_sec))

	//t.Log(a_sec == b_sec)


}