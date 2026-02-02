import type { StructureResolver } from "sanity/structure";
import {
  LayoutTemplate, // Ikona dla sekcji "Teksty na stronie"
  Home, // Ikona dla Strony Głównej
  MessageSquare, // Ikona dla Opinii
  Map, // Ikona dla Wypraw
  BookOpen, // Ikona dla Bloga (Folder)
  FileText, // Ikona dla Postów
  Tags, // Ikona dla Kategorii
  Users,
  Calendar,
  Search, // Ikona dla Autorów
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Panel Teraz Chiny") // Tytuł głównego menu
    .items([
      // --- 1. KOLUMNA: TEKSTY NA STRONIE (Folder) ---
      S.listItem()
        .title("Teksty na stronie") // Nazwa widoczna w menu
        .icon(LayoutTemplate)
        .child(
          S.list()
            .title("Wybierz stronę") // Tytuł po wejściu w folder
            .items([
              // Tutaj wrzucamy "Stronę Główną" jako Singleton
              S.listItem()
                .title("Strona Główna (Landing)")
                .icon(Home)
                .id("landingPage")
                .child(
                  S.document()
                    .schemaType("landingPage")
                    .documentId("landingPage"),
                ),
              S.listItem()
                .title("Strona Kalendarz")
                .icon(Calendar)
                .child(
                  S.document()
                    .schemaType("calendarPage")
                    .documentId("calendarPage"),
                ),
              S.listItem()
                .title("Strona Blog (SEO)")
                .icon(Search)
                .child(
                  S.document().schemaType("blogPage").documentId("blogPage"),
                ),

              // W przyszłości tutaj dodasz "O Nas", "Kontakt" itp.
            ]),
        ),

      S.divider(), // Pozioma kreska oddzielająca

      // --- 2. KOLUMNA: OPINIE ---
      S.documentTypeListItem("review").title("Opinie").icon(MessageSquare),

      S.divider(),

      // --- 3. KOLUMNA: WYPRAWY ---
      S.documentTypeListItem("trip").title("Wyprawy").icon(Map),

      S.divider(),

      // --- 4. KOLUMNA: BLOG (Folder) ---
      S.listItem().title("Blog").icon(BookOpen).child(
        S.documentTypeList("post").title("Artykuły"),
        // To sprawi, że od razu po lewej stronie będziesz miał listę wpisów
      ),
    ]);
