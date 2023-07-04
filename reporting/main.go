package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	teams "github.com/dasrick/go-teams-notify/v2"
	_ "github.com/go-sql-driver/mysql"
)

func getProductCount(uri string) (int, error) {
	db, err := sql.Open("mysql", uri)
	if err != nil {
		return 0, err
	}
	defer db.Close()

	count := 0
	err = db.QueryRow("SELECT COUNT(*) FROM products;").Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func sendMessageToTeams(webhookURL string, productCount int) error {
	// setup message card
	msgCard := teams.NewMessageCard()
	msgCard.Title = "Daily reporting"
	msgCard.Text = fmt.Sprintf("%d products in database\n", productCount)
	msgCard.ThemeColor = "#DF813D"

	// send
	mstClient := teams.NewClient()
	return mstClient.Send(webhookURL, msgCard)
}

func main() {
	dbURI := os.Getenv("DB_URI")
	webhookURL := os.Getenv("WEBHOOK_URL")

	if len(dbURI) == 0 {
		log.Fatal("Missing DB_URI environment variable")
	}
	if len(webhookURL) == 0 {
		log.Fatal("Missing WEBHOOK_URL environment variable")
	}

	count, err := getProductCount(dbURI)
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println(count)

	err = sendMessageToTeams(webhookURL, count)
	if err != nil {
		log.Fatal(err.Error())
	}
}
