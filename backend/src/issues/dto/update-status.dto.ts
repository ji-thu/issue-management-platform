export class UpdateStatusDto {
  status:
    | "OPEN"
    | "IN_PROGRESS"
    | "RESOLVED"
    | "CLOSED";
}