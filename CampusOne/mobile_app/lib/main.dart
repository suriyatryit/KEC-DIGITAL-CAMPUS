import 'package:flutter/material.dart';
import 'package:campusone/screens/login_screen.dart';

void main() {
  runApp(const CampusOneApp());
}

class CampusOneApp extends StatelessWidget {
  const CampusOneApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CampusOne',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.indigo,
        scaffoldBackgroundColor: const Color(0xFF09090B),
        fontFamily: 'Inter',
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF18181B),
          elevation: 0,
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
