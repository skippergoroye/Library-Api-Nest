import { Category } from "../schema/book.schema";

export class UpdateBookDto {
    readonly title: string;
    readonly author: string;
    readonly description: string;
    readonly price: string;
    readonly category: Category[];
}