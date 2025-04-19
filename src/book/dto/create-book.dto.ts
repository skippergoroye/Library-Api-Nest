import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schema/book.schema";


export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @IsNotEmpty()
    @IsString()
    readonly author: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    @IsString()
    readonly price: string;
    @IsNotEmpty()
    @IsEnum(Category, {message : "Please select a valid category"})
    readonly category: Category[];
}