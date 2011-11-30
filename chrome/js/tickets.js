$(function(){
	for(var i=0; i<data.issues.length; i++){

		data.issues[i].description = convert_textile(data.issues[i].description);
		
		ticket = renderTicket(data.issues[i]);
		ticket.find(".ticket-progress").progressbar({
			value: data.issues[i].done_ratio
		});

		ticket.dialog({
			position : [20, 40],
			dragStop : function(event, ui){
				console.log(event, ui);
			}
		});
	}
});


function renderTicket(json){
	console.log(json)
	return ich.ticket(json);
}



data = {
    "limit": 25,
    "issues": [
        {
            "done_ratio": 0,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/16 12:17:55 +0200",
            "project": {
                "name": "Sportco",
                "id": 24
            },
            "fixed_version": {
                "name": "Relaunch: Fertigstellung Templates",
                "id": 655
            },
            "start_date": "2011/09/16",
            "description": "Grundsätzlich Abbildung nach Screenvorschlag.\r\n\r\nZu beachten:\r\n\r\n* die Kategorie-Spalten sollen jetzt 7 sein => die Texte sind im letzten Screenvorschlag bereits sehr klein. Auch Gefahr der Überfrachtung. Bitte prüfen, ob die Menge der Endkategorien wirklich (für den Endkunden!) notwendig ist\r\n* die Kategorie-Spalten müssen eine feste Breite haben. Wenn ein einzelner Text zu lang ist, kann das zu Problemen führen (siehe Screen Erhard im Anhang)\r\n* die Kategorien werden in der vom SoftKat-Export gelieferten Reihenfolge ausgelesen. Das gilt auch für die Unterkategorien. Wenn eine Kategorie sehr viele Unterkategorien hat, brechen diese trotzdem nicht um. Zu beachten, wenn die erste Kategorie leer ist oder wenige Unterkategorien enthält, entsteht ein Loch (siehe 2 Screen Erhard im Anhang)\r\n* die Kategorien werden in 2 Reihen dargestellt, wenn es mehr als 7 Kategorien sind. Diese Reihen müssen sich auf einer Höhe befinden und können in Reihe 2 frühstens nach der längsten Kategorie in der ersten Reihe starten. Abbildung wie im Screenvorschlag nicht möglich.\r\n ",
            "subject": "Darstellung Megamenüs",
            "created_on": "2011/09/16 11:32:15 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Jan Kix",
                "id": 6
            },
            "id": 10722,
            "assigned_to": {
                "name": "Satzmedia Team",
                "id": 8
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 90,
            "status": {
                "name": "Abnahme erforderlich",
                "id": 10
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/16 13:02:19 +0200",
            "project": {
                "name": "Sportco",
                "id": 24
            },
            "start_date": "2011/09/16",
            "description": "Hallo Frau Richter,\r\n\r\nhier der neue Header für die Startseite.\r\n\r\nBitte verlinken auf http://www.sportgeraete-wartung.de/ und den Link in einem neuen Tab öffnen.\r\n\r\n\r\nDanke,\r\n\r\nviele Grüße\r\n\r\nKevin Reichardt",
            "subject": "Änderung Header Startseite",
            "created_on": "2011/09/16 11:28:11 +0200",
            "custom_fields": [
                {
                    "value": "Servicepauschale",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Kevin Reichardt",
                "id": 181
            },
            "id": 10721,
            "assigned_to": {
                "name": "Kevin Reichardt",
                "id": 181
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/16 10:18:13 +0200",
            "project": {
                "name": "HellermannTyton",
                "id": 13
            },
            "category": {
                "name": "HT-Web",
                "id": 207
            },
            "start_date": "2011/09/16",
            "description": "Im Zuge der UL-Verlinkungen und das Parsen von Links in Produktbeschreibungen, ist Herrn Eckelt aufgefallen, dass bspw. das CMP \"bold\" von uns interpretiert werden könnte und so im Browser fett dargestellt werden kann. \r\n\r\nAuf http://de.stage.ht.satzmedia.de/productdetail?PRODUCTID=897-90018 haben wir ein Beispiel.\r\nWenn Sie uns eine Liste der CMP-Formatierungen geben könnten die wir bei der Anzeige interpretieren sollen, können wir da mal den Aufwand schätzen.",
            "subject": "Interpretation von CMP-Formatierungen",
            "created_on": "2011/09/16 10:18:13 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Thies Meier",
                "id": 9
            },
            "id": 10720,
            "assigned_to": {
                "name": "Alexander Platzbecker",
                "id": 53
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 80,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Fehler",
                "id": 1
            },
            "updated_on": "2011/09/15 17:54:17 +0200",
            "project": {
                "name": "MB PDB",
                "id": 15
            },
            "fixed_version": {
                "name": "Version 3.0 der PDB",
                "id": 266
            },
            "start_date": "2011/09/15",
            "description": "TODO REFACTORING",
            "subject": "Zusammenspiel: MissingTranslation, CheckTranslation und Proofreading Subs",
            "created_on": "2011/09/15 17:52:19 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Bea Rathge",
                "id": 10
            },
            "id": 10718,
            "parent": {
                "id": 8739
            },
            "assigned_to": {
                "name": "Bea Rathge",
                "id": 10
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Freigabe erforderlich",
                "id": 8
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/15 17:35:18 +0200",
            "project": {
                "name": "aliqua",
                "id": 28
            },
            "category": {
                "name": "Sonstiges",
                "id": 182
            },
            "start_date": "2011/09/15",
            "description": "Wir bräuchten allmählich eine STAGE-Instanz fürs Shopware-Aliqua. Der Plan ist, hier alle Daten sauber übers Backoffice einzupflegen. Später soll diese Instanz zur LIVE-Instanz werden (oder zumindest die Datenbank für LIVE kopiert werden). Bekommen wir das so hin?",
            "subject": "STAGE-Instanz aufsetzen",
            "created_on": "2011/09/15 15:01:34 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Katja Kiesow",
                "id": 12
            },
            "id": 10716,
            "assigned_to": {
                "name": "Thies Meier",
                "id": 9
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 70,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/16 08:46:35 +0200",
            "project": {
                "name": "Kataloge",
                "id": 30
            },
            "fixed_version": {
                "name": "2011/09",
                "id": 550
            },
            "start_date": "2011/09/15",
            "description": "356 Seiten\r\nCSV-Datei per Mail ( \\\\INTRANET\\pdf_produktion\\Emmos\\Vega Österreich 08_11 )\r\n",
            "subject": "VEGA Österreich 08/11 [1:2001]",
            "created_on": "2011/09/15 14:23:07 +0200",
            "custom_fields": [
                {
                    "value": "0",
                    "name": "Rechnung erstellt",
                    "id": 14
                },
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Denise Gericke",
                "id": 20
            },
            "id": 10712,
            "assigned_to": {
                "name": "Denise Gericke",
                "id": 20
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 80,
            "status": {
                "name": "QS",
                "id": 7
            },
            "tracker": {
                "name": "Änderungswunsch",
                "id": 6
            },
            "updated_on": "2011/09/15 15:20:43 +0200",
            "project": {
                "name": "D+H mechatronic",
                "id": 50
            },
            "start_date": "2011/09/14",
            "description": "Hallo Herr Meyer-Westphal,\r\n\r\nanbei ein aktualisierter Datensatz, der um die nicht notwendigen Daten bereinigt wurde, oder anders ausgedrückt, nur die Verkaufsartikel beinhaltet.\r\n\r\nEin Punkt ist aber noch dringend zu beachten: Wie Sie ja wissen, stehen derzeit alle technischen Daten in wie Kraft und Hub usw. in einem Textfeld. Zukünftig wollen wir die Daten granulieren und dann entweder aus dem ERP oder aus dem PIM einspielen. Von daher könnte es Sinn machen, entsprechende Datenfelder in Ihrer Datenbank vorzuhalten, auch wenn sie am Anfang keine Daten erhalten werden.\r\n\r\nViele Grüße aus Atlanta\r\nS. Kuntschmann",
            "subject": "Neuimport der Produktdaten für den D+H-Prototyp",
            "created_on": "2011/09/14 18:09:21 +0200",
            "custom_fields": [
                {
                    "value": "Leistungsscheinprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "due_date": "2011/09/19",
            "author": {
                "name": "Markus Meyer-Westphal",
                "id": 7
            },
            "id": 10708,
            "assigned_to": {
                "name": "Markus Meyer-Westphal",
                "id": 7
            },
            "priority": {
                "name": "Hoch",
                "id": 5
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/14 17:12:01 +0200",
            "project": {
                "name": "aliqua",
                "id": 28
            },
            "category": {
                "name": "IT-Umsetzung",
                "id": 181
            },
            "fixed_version": {
                "name": "Shopware",
                "id": 680
            },
            "start_date": "2011/09/14",
            "description": "",
            "subject": "Blog Übersicht & Detailseite Umsetzung",
            "created_on": "2011/09/14 17:12:01 +0200",
            "custom_fields": [
                {
                    "value": "Leistungsscheinprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Alexander Rahlf",
                "id": 183
            },
            "id": 10707,
            "assigned_to": {
                "name": "Alexander Rahlf",
                "id": 183
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Fehler",
                "id": 1
            },
            "updated_on": "2011/09/15 15:03:15 +0200",
            "project": {
                "name": "MB PDB",
                "id": 15
            },
            "category": {
                "name": "Legal Check Bereich (PM, Edito",
                "id": 46
            },
            "fixed_version": {
                "name": "Version 3.0 der PDB",
                "id": 266
            },
            "start_date": "2011/09/14",
            "description": "Zwei Screens anbei, die das Problem zeigen: \r\n\r\n!tc_model1.png!\r\n\r\nund \r\n\r\n!internet_model2.png!\r\n\r\nIch bearbeite auf dem TC Reiter den Modelname (Legal NOK zu neuem Wert = Legal UNDEF). \r\nAlle Reiter werden initial geladen, so dass der Austausch auch im gesamten HTML durchgeführt \r\nwerden muss. \r\n",
            "subject": "Identische Referenzen im kompletten DOM Baum austauschen (PM Bereich, Task Legal Suggestion)",
            "created_on": "2011/09/14 16:13:57 +0200",
            "custom_fields": [
                {
                    "value": "Garantie",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Stefan Strobitzki",
                "id": 30
            },
            "id": 10705,
            "parent": {
                "id": 8739
            },
            "assigned_to": {
                "name": "Stefan Strobitzki",
                "id": 30
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 100,
            "status": {
                "name": "QS",
                "id": 7
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/15 10:43:42 +0200",
            "project": {
                "name": "Compass",
                "id": 23
            },
            "category": {
                "name": "Newsletter",
                "id": 159
            },
            "start_date": "2011/09/16",
            "description": "*Grafik: wie die vom 09.09.*\r\n\r\nBetreff UK: FREE* postage and packing\r\nBetreff F: Frais de port gratuits jusqu’au 22.09.\r\n\r\nSuper-shopping at Compass with free* postage and packing\r\n\r\nFree postage and packing until 22.09.2011\r\n\r\nDear Mr. ……..,\r\n\r\nguaranteed lowest prices on all items, plus extra savings for one more week – can you buy more cheaply anywhere else?\r\nUntil 22.09.2011 we are offering you exclusively\r\n\r\nFree postage and packing!*\r\n\r\n*Standard delivery only. Does not include heavy goods surcharge, Express, EU, Channel Island and Eire.\r\n\r\nSimply enter the special offer code NEWS616.\r\n\r\nYou may have experienced difficulties in placing orders on our website recently, and we would like to take this opportunity to apologize for this. We are happy to report that the problem with our website has been resolved and ordering online is now as easy as ever!\r\n\r\n\r\nText F:\r\n\r\n\r\nSuper shopping chez Compass avec les frais de port gratuits* jusqu’au 22.09.2011\r\n\r\nCher…..\r\n\r\nprix bas garantis sur la totalité de l’assortiment, plus des économies supplémentaires pendant une semaine.\r\nJusqu’au 22.09.2011, nous vous permettons de profiter\r\n\r\ndes frais de port gratuits*\r\n\r\n*exception faite des frais supplémentaires pour les articles lourds et encombrants et les livraisons dans les DOM TOM.\r\n\r\nIndiquez simplement votre code avantage personnel NEWS616.\r\n\r\nNous vous souhaitons beaucoup de plaisir !\r\n",
            "subject": "Newslettergrafik VSK-frei UK/F 16.09.",
            "created_on": "2011/09/14 12:46:29 +0200",
            "custom_fields": [
                {
                    "value": "0",
                    "name": "Rechnung erstellt",
                    "id": 14
                },
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Mirian Nieländer",
                "id": 105
            },
            "id": 10704,
            "assigned_to": {
                "name": "Karen Schirm",
                "id": 39
            },
            "priority": {
                "name": "Hoch",
                "id": 5
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/14 12:32:14 +0200",
            "project": {
                "name": "aliqua",
                "id": 28
            },
            "category": {
                "name": "IT-Umsetzung",
                "id": 181
            },
            "fixed_version": {
                "name": "Shopware",
                "id": 680
            },
            "start_date": "2011/09/14",
            "description": "",
            "subject": "Produkt-Übersichtseite Umsetzung",
            "created_on": "2011/09/14 12:32:14 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Alexander Rahlf",
                "id": 183
            },
            "id": 10703,
            "assigned_to": {
                "name": "Alexander Rahlf",
                "id": 183
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/13 17:30:27 +0200",
            "project": {
                "name": "Sportco",
                "id": 24
            },
            "start_date": "2011/09/13",
            "description": "Auf den Artikel Detailseiten, gibt es den Menu-Eintrag \"Artikel Vergleichen\" (siehe PDF Datei Version 13 Seite 10 & 11), gehe nach der Standard Logik von Shopware wird mit dem klicken auf diesen Menupunkt der Artikel der Vergleichsliste hinzugefügt. Jedoch fehlt der Menupunkt zum starten des Vergleiches der Artikel die sich in der Vergleichsliste befinden.",
            "subject": "Fehlender Menupunkt \"Vergleich starten\"",
            "created_on": "2011/09/13 13:14:19 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Jan Lieckfeldt",
                "id": 182
            },
            "id": 10698,
            "assigned_to": {
                "name": "Jan Kix",
                "id": 6
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/13 12:34:12 +0200",
            "project": {
                "name": "Kataloge",
                "id": 30
            },
            "fixed_version": {
                "name": "2011/09",
                "id": 550
            },
            "start_date": "2011/09/13",
            "description": "122 verlinken",
            "subject": "K263_HSCH_Heft III [1:1994]",
            "created_on": "2011/09/13 11:58:11 +0200",
            "custom_fields": [
                {
                    "value": "0",
                    "name": "Rechnung erstellt",
                    "id": 14
                },
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "due_date": "2011/09/16",
            "author": {
                "name": "Denise Gericke",
                "id": 20
            },
            "estimated_hours": 3.18,
            "id": 10696,
            "assigned_to": {
                "name": "Denise Gericke",
                "id": 20
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 90,
            "status": {
                "name": "QS",
                "id": 7
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/14 16:56:30 +0200",
            "project": {
                "name": "MB PDB",
                "id": 15
            },
            "fixed_version": {
                "name": "Version 3.0 der PDB",
                "id": 266
            },
            "start_date": "2011/09/13",
            "description": "Eine bestehende Variante kann von einem Master an einen anderen Master gehängt werden.",
            "subject": "Variant to Variant",
            "created_on": "2011/09/13 09:24:18 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Bea Rathge",
                "id": 10
            },
            "id": 10691,
            "parent": {
                "id": 8709
            },
            "assigned_to": {
                "name": "Bea Rathge",
                "id": 10
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/13 09:11:30 +0200",
            "project": {
                "name": "aliqua",
                "id": 28
            },
            "category": {
                "name": "IT-Umsetzung",
                "id": 181
            },
            "fixed_version": {
                "name": "Shopware",
                "id": 680
            },
            "start_date": "2011/09/12",
            "description": "",
            "subject": "Produkt-Detailseite Umsetzung",
            "created_on": "2011/09/13 09:11:30 +0200",
            "custom_fields": [
                {
                    "value": "Leistungsscheinprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Alexander Rahlf",
                "id": 183
            },
            "id": 10690,
            "assigned_to": {
                "name": "Alexander Rahlf",
                "id": 183
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 40,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/15 09:47:11 +0200",
            "project": {
                "name": "Kataloge",
                "id": 30
            },
            "fixed_version": {
                "name": "2011/09",
                "id": 550
            },
            "start_date": "2011/09/13",
            "description": "* NL\r\n* PL\r\n* IT\r\n* FI\r\n* SE\r\n* DK\r\n\r\nDesignerstellung für die Broschüren auf dem ASP1\r\nsiehe Ticket #10625\r\n",
            "subject": "Einrichten Catoya Designs für HT",
            "created_on": "2011/09/13 09:02:10 +0200",
            "custom_fields": [
                {
                    "value": "0",
                    "name": "Rechnung erstellt",
                    "id": 14
                },
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "due_date": "2011/09/28",
            "author": {
                "name": "Denise Gericke",
                "id": 20
            },
            "estimated_hours": 3.5,
            "id": 10689,
            "assigned_to": {
                "name": "Bastian Scheefe",
                "id": 141
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 100,
            "status": {
                "name": "Abnahme erforderlich",
                "id": 10
            },
            "tracker": {
                "name": "Service und Support",
                "id": 3
            },
            "updated_on": "2011/09/14 11:55:42 +0200",
            "project": {
                "name": "aliqua",
                "id": 28
            },
            "start_date": "2011/09/12",
            "description": "Hallo Herr Meyer, \r\n\r\nbezüglich der Bedienung des Shopware Content Management Systems würden wir gerne einem Ihrer bestehenden Kunden einen Referenzbesuch abstatten. Ziel ist, dass wir uns ein Bild von der täglichen Arbeit und dem praktischen Umgang des CMS machen können. \r\nWäre es möglich, dass Sie uns mit einem Ihrer Kunden zusammenbringen, die einen von den Funktionen her ähnlichen Online-Shop wie Aliqua betreiben? Idealerweise nutzt dieser Kunde auch die Blog-Funktion. \r\n\r\nFreundliche Grüße\r\nInes Drefs ",
            "subject": "Referenzbesuch",
            "created_on": "2011/09/12 15:51:15 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Ines Drefs",
                "id": 179
            },
            "id": 10687,
            "assigned_to": {
                "name": "Ines Drefs",
                "id": 179
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 70,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/15 09:48:08 +0200",
            "project": {
                "name": "Kataloge",
                "id": 30
            },
            "fixed_version": {
                "name": "2011/09",
                "id": 550
            },
            "start_date": "2011/09/12",
            "description": "",
            "subject": "JPC Courier 10/2011 [2:1313]",
            "created_on": "2011/09/12 15:50:27 +0200",
            "custom_fields": [
                {
                    "value": "0",
                    "name": "Rechnung erstellt",
                    "id": 14
                },
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "due_date": "2011/09/19",
            "author": {
                "name": "Pavel Groß",
                "id": 58
            },
            "estimated_hours": 3.86,
            "id": 10686,
            "assigned_to": {
                "name": "Pavel Groß",
                "id": 58
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/12 12:07:20 +0200",
            "project": {
                "name": "Sportco",
                "id": 24
            },
            "fixed_version": {
                "name": "Relaunch: Fertigstellung Templates",
                "id": 655
            },
            "start_date": "2011/09/12",
            "description": "Damit das Kategorie Menu abhängig von den Kategorien farblich hervor gehoben werden kann wird eine Erweiterung der Hookpoints in Shopware benötigt, da auf der Ebene der Kategorie Ansichten momentan nicht auf die internen ID's der Kategorien zugegriffen werden kann.\r\n\r\nDas gleiche gilt für die Banner für die Topseller auf der Kategorien Seite , hier muss sowohl auf den Namen der Main Kategorien zugegriffen werden können als auch auf die ID um die Hintergrundfarbe Kategorie abhängig über die CSS steuern zu können.\r\n",
            "subject": "Variablen Zugriff \"Kategorien\" => Erstellung von Hookpoints (Backend)",
            "created_on": "2011/09/12 11:46:39 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Jan Lieckfeldt",
                "id": 182
            },
            "id": 10684,
            "assigned_to": {
                "name": "Jan Lieckfeldt",
                "id": 182
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 80,
            "status": {
                "name": "in Bearbeitung",
                "id": 2
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/12 18:26:10 +0200",
            "project": {
                "name": "Kataloge",
                "id": 30
            },
            "fixed_version": {
                "name": "2011/09",
                "id": 550
            },
            "start_date": "2011/09/09",
            "description": "",
            "subject": "HellermannTyton: Subdomains gemäß Ticket",
            "created_on": "2011/09/12 11:34:01 +0200",
            "custom_fields": [
                {
                    "value": "0",
                    "name": "Rechnung erstellt",
                    "id": 14
                },
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "due_date": "2011/09/12",
            "author": {
                "name": "Bastian Scheefe",
                "id": 141
            },
            "estimated_hours": 3.5,
            "id": 10683,
            "assigned_to": {
                "name": "Bastian Scheefe",
                "id": 141
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 20,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Neue Anforderung",
                "id": 2
            },
            "updated_on": "2011/09/13 12:56:39 +0200",
            "project": {
                "name": "Sportco",
                "id": 24
            },
            "fixed_version": {
                "name": "Relaunch: Fertigstellung Templates",
                "id": 655
            },
            "start_date": "2011/09/12",
            "description": "Um die Darstellung der Vorgaben (PDF Datei Version 13, Seite 6 bis 9) umsetzen zu können, ist es notwendig das die Datei \"listing.php\" im Backend dahingehend angepasst wird, das diese um die Datei \"article_listing_4col-sportco-article-subpage.tpl\" erweitert wird.\r\n\r\nHintergrund die Hauptkategorien wie z.B. \"Teamsport\" sowie die Unterkategorien wie z.B. \"Fussball\" haben ein anderes Layout als die Unterkategorie z.B. \"Fussballtore\".",
            "subject": "Anpassung der Datei \"engine/Shopware/Controllers/Frotend/Listing.php\"",
            "created_on": "2011/09/12 11:00:09 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Jan Lieckfeldt",
                "id": 182
            },
            "id": 10682,
            "assigned_to": {
                "name": "Denis Kamenev",
                "id": 27
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 100,
            "status": {
                "name": "Abnahme erforderlich",
                "id": 10
            },
            "tracker": {
                "name": "Fehler",
                "id": 1
            },
            "updated_on": "2011/09/12 10:03:34 +0200",
            "project": {
                "name": "HellermannTyton",
                "id": 13
            },
            "category": {
                "name": "Internet",
                "id": 31
            },
            "start_date": "2011/09/12",
            "description": "HT-internes Feedback aus Finnland:\r\n\r\nWe have problem in internet pages when trying to get info about products ( i guess it is for all products...)\r\nWhen I put in UNS in search and try to find it internet pages gives following error message:\r\n \r\nTemplate-Path: /WEB-INF/pages/errorpages/contentdelivery_error.jsp\r\nDescription:   Common errorpage for content-delivery-application. Should be customized with specific site-design.\r\n\r\nHabe es auch gerade probiert mit der UNS 111-01919 und bekomme denselben Applikationsfehler\r\n\r\nBitte fixen.",
            "subject": "Applikationsfehler Produktsuche Finnland",
            "created_on": "2011/09/12 08:57:59 +0200",
            "custom_fields": [
                {
                    "value": "Garantie",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Anke Peuss",
                "id": 57
            },
            "id": 10680,
            "assigned_to": {
                "name": "Anke Peuss",
                "id": 57
            },
            "priority": {
                "name": "Hoch",
                "id": 5
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Fehler",
                "id": 1
            },
            "updated_on": "2011/09/09 15:56:04 +0200",
            "project": {
                "name": "MB PDB",
                "id": 15
            },
            "fixed_version": {
                "name": "Version 3.0 der PDB",
                "id": 266
            },
            "start_date": "2011/09/09",
            "description": "Werte, die im EP als NOK gekennzeichnet werden, duerfen nicht in LC auflaufen.",
            "subject": "Zusammenspiel Editorial Proofread und Legal Check",
            "created_on": "2011/09/09 15:56:04 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Bea Rathge",
                "id": 10
            },
            "id": 10678,
            "parent": {
                "id": 8739
            },
            "assigned_to": {
                "name": " Satzmedia Team",
                "id": 68
            },
            "priority": {
                "name": "Hoch",
                "id": 5
            }
        },
        {
            "done_ratio": 80,
            "status": {
                "name": "QS",
                "id": 7
            },
            "tracker": {
                "name": "Fehler",
                "id": 1
            },
            "updated_on": "2011/09/13 16:21:35 +0200",
            "project": {
                "name": "MB PDB",
                "id": 15
            },
            "start_date": "2011/09/09",
            "description": "Beim Editorial Proofreader ist die Ueberschrift \"Proofread this value\". Beim Legal Checker auch, da sollte aber wohl sowas wie \"Legal check this value\" stehen...",
            "subject": "Legal Check: Eingabemaske hat falsche Ueberschrift",
            "created_on": "2011/09/09 15:23:34 +0200",
            "custom_fields": [
                {
                    "value": "Kleinstprojekt",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Bea Rathge",
                "id": 10
            },
            "id": 10676,
            "parent": {
                "id": 10420
            },
            "assigned_to": {
                "name": "Stefan Strobitzki",
                "id": 30
            },
            "priority": {
                "name": "Normal",
                "id": 4
            }
        },
        {
            "done_ratio": 0,
            "status": {
                "name": "Neu",
                "id": 1
            },
            "tracker": {
                "name": "Fehler",
                "id": 1
            },
            "updated_on": "2011/09/09 15:17:33 +0200",
            "project": {
                "name": "MB PDB V3",
                "id": 49
            },
            "category": {
                "name": "Publikationsmanagement",
                "id": 209
            },
            "fixed_version": {
                "name": "3.0",
                "id": 681
            },
            "start_date": "2011/09/09",
            "description": "trotz erfolgreicher Befüllung von Request z.B.\r\n@{\r\n\"productRefId\":1865,\r\n\"targetMaster\":1870,\r\n\"publicationId\":12,\r\n\"attributeId\":\"156\"\r\n}@\r\n\r\nbekomme ich ein Fehler für den ajax aufruf zurück.",
            "subject": "master2Variant erzeugt 500 error",
            "created_on": "2011/09/09 15:17:33 +0200",
            "custom_fields": [
                {
                    "value": "Garantie",
                    "name": "Account",
                    "id": 19
                }
            ],
            "author": {
                "name": "Christian Hünerfauth",
                "id": 157
            },
            "id": 10675,
            "assigned_to": {
                "name": "Mascha Werner",
                "id": 28
            },
            "priority": {
                "name": "Hoch",
                "id": 5
            }
        }
    ],
    "total_count": 1557,
    "offset": 0
};
