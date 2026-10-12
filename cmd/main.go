package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v3"
)

func healthcheck(c fiber.Ctx) error {
	return c.SendString("ok")
}

func main() {
	app := fiber.New()

	app.Get("/healthcheck", healthcheck)
	fmt.Println("hello,world")
	log.Fatal(app.Listen(":3300"))
}
