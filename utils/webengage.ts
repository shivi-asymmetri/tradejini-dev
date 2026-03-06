export function WebEngage(
  name: string,
  page: string,
  button: string,
  destination: string,
) {
  console.log("WebEngage", name, page, button, destination);
  // @ts-expect-error ungabunga
  webengage.track(name, {
    page: page,
    button: button,
    destination: destination,
  });
}

