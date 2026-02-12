import { type SchemaTypeDefinition } from "sanity";
import { landingPage } from "./landingPage";
import { post } from "./post";
import { trip } from "./trip";

import { review } from "./review";
import { calendarPage } from "./calendarPage";
import { blogPage } from "./blogPage";
import { galleryYear } from "./galleryYear";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, trip, post, review, calendarPage, blogPage, galleryYear],
};
