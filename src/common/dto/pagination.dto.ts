import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginaitonDTO {
    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @Min(1)
    page:number = 1

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit:number = 25
}