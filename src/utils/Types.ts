export namespace Types {

    export type user = {
        name: string,
        id: string
    }

    export type category = {
        title: string,
        id: string
    }

    export type note = {
        user: user,
        category: category,
        content: string
    }
}