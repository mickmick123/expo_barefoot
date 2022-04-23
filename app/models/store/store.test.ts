import { StoreModel } from "./store"

test("can be created", () => {
  const instance = StoreModel.create({})

  expect(instance).toBeTruthy()
})
