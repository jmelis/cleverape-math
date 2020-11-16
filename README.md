# CleverApes Math

Very simple app for children to practice basic arithmetic.

It has been written using https://expo.io/, which is a [React Native](https://reactnative.dev/) framework and platform.

## Screencast

![](cleverapes-math.gif)

## Math levels

All the levels are defined in [levels.json](lib/levels.json).

## Limitations & Roadmap

- Add more levels.
- The UI is too bleak.
- CSS styles is all over the place, it needs to be refactored.
- Add testing.
- Test in devices with different pixel densities, screen ratios and with horizontal orientation.
- Change the color of the [timer bar](https://github.com/oblador/react-native-progress). A simple: `color: <color>` did not work.
- Display a nicer message when the previous record has been beaten.
- Convert from [FlatList](https://reactnative.dev/docs/flatlist) to [SectionList](https://reactnative.dev/docs/sectionlist) and group them in sections.
- Add i18n support.
- Automate builds with GitHub actions. May require to run `expo eject`.