import PokemonList from "@/components/PokemonList";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <PokemonList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
