import type { StructureResolver } from "sanity/structure";
import {
  LayoutTemplate,
  Home,
  MessageSquare,
  Map,
  BookOpen,
  Calendar,
  Search,
  Images,
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Panel Teraz Chiny")
    .items([
      S.listItem()
        .title("Teksty na stronie")
        .icon(LayoutTemplate)
        .child(
          S.list()
            .title("Wybierz stronę")
            .items([
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
            ]),
        ),

      S.divider(),

      S.documentTypeListItem("review").title("Opinie").icon(MessageSquare),

      S.divider(),

      S.documentTypeListItem("trip").title("Wyprawy").icon(Map),

      S.divider(),

      S.listItem()
        .title("Blog")
        .icon(BookOpen)
        .child(S.documentTypeList("post").title("Artykuły")),

      S.listItem().title("Galeria Zdjęć").icon(Images).child(
        // Wyświetlamy po prostu listę dokumentów typu "galleryYear"
        S.documentTypeList("galleryYear").title("Wybierz Rok"),
      ),
    ]);
