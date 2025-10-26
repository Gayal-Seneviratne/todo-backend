export class CreateTaskDto {
  title: string;
  description?: string;

  constructor(title: string, description?: string) {
    this.title = title;
    this.description = description;
  }

  //set getters and setters
    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getDescription(): string | undefined {
        return this.description;
    }

    setDescription(description: string): void {
        this.description = description;
    }
}
