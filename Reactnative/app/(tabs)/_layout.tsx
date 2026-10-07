import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="admin" />
      <Tabs.Screen name="faculty" />
      <Tabs.Screen name="student" />
    </Tabs>
  );
}
