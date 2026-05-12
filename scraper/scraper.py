from playwright.sync_api import sync_playwright
import json
import random

mock_status = [
    {
        "weather": "Heavy Rain",
        "floodRisk": "High",
        "recommendedSeverity": "danger",
        "warning": "Possible road flooding detected"
    },
    {
        "weather": "Moderate Rain",
        "floodRisk": "Moderate",
        "recommendedSeverity": "moderate",
        "warning": "Flood-prone streets nearby"
    },
    {
        "weather": "Light Rain",
        "floodRisk": "Low",
        "recommendedSeverity": "safe",
        "warning": "Road conditions are safe"
    }
]

with sync_playwright() as p:

    browser = p.chromium.launch(headless=True)

    page = browser.new_page()

    page.goto("https://news.google.com")

    title = page.title()

    generated_data = random.choice(mock_status)

    output = {
        "source": title,
        "weather": generated_data["weather"],
        "floodRisk": generated_data["floodRisk"],
        "recommendedSeverity": generated_data["recommendedSeverity"],
        "warning": generated_data["warning"]
    }

    with open("../data/floodData.json", "w") as file:
        json.dump(output, file, indent=2)

    browser.close()

print("Flood data generated successfully.")