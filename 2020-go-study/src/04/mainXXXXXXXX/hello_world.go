package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) > 1 {
		fmt.Println("hhh",os.Args[1])
		fmt.Println(os.Args)
	}
}
