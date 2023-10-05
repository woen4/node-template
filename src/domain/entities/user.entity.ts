import { Entity } from '@core/domain/entity'

export type UserProps = {
  name: string
  email: string
}

export class User extends Entity<UserProps> {
  props: UserProps

  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id)

    return user
  }
}
