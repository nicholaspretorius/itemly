import { ApiModelProperty } from '@nestjs/swagger';

export class TodoDto {
    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly done: boolean;
}