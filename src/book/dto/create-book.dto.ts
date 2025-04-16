import { Category } from "../schema/book.schema";

export class CreateBookDto {
    readonly title: string;
    readonly author: string;
    readonly description: string;
    readonly price: string;
    readonly category: Category[];
}