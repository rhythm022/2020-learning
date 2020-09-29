package client

import (
	"c21/series"
	"fmt"
	"testing"
)


func init(){
	fmt.Println("00000000000")

}
func TestPackage(t *testing.T)  {
	series.MySeries()
	series.Noseries()
}
