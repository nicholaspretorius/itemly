import { ApiModelProperty } from '@nestjs/swagger';

export class TodoDto {

    @ApiModelProperty()
    userId: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly done: boolean;
}