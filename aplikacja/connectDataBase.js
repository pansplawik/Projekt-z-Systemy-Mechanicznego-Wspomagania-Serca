import { useEffect, useState } from "react";
import SQLite from "react-native-sqlite-storage";

export const SQL = () => {
	const [pomiar,setPomiar]=useState(0)
    useEffect(() => {
		SQLite.enablePromise(true);

		SQLite.openDatabase({ name: "database", location: "default" })
			.then((db) => {
				console.log("Połączono z bazą danych.");
				db.executeSql(
					"CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, number INTEGER)",
					[]
				)
					.then(() => {
						console.log("Tabela utworzona.");
					})
					.catch((error) => {
						console.error("Błąd podczas tworzenia tabeli:", error);
					});
			})
			.catch((error) => {
				console.error("Błąd podczas otwierania bazy danych:", error);
			});

		return () => {
			SQLite.closeDatabase()
				.then(() => {
					console.log("Zamknięto połączenie z bazą danych.");
				})
				.catch((error) => {
					console.error("Błąd podczas zamykania bazy danych:", error);
				});
		};
	}, []);

	const addDataToTable = () => {
		const currentDate = new Date().toISOString().split("T")[0];
		const randomNumber = Math.floor(Math.random() * 6) + 95;

		SQLite.openDatabase({ name: "myDatabase", location: "default" })
			.then((db) => {
				db.executeSql("INSERT INTO MyTable (pomiar, data) VALUES (${pomiar},{DATA.today})", [
					currentDate,
					randomNumber,
				])
					.then(() => {
						console.log("Dane dodane do tabeli.");
					})
					.catch((error) => {
						console.error("Błąd podczas dodawania danych:", error);
					});
			})
			.catch((error) => {
				console.error("Błąd podczas otwierania bazy danych:", error);
			});
	};
};
