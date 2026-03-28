import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.0, 0.6, curve: Curves.easeOut)),
    );

    _slideAnimation = Tween<Offset>(begin: const Offset(0.0, 0.1), end: Offset.zero).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.2, 0.8, curve: Curves.easeOutCubic)),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleLogin() async {
    setState(() {
      _isLoading = true;
    });
    HapticFeedback.mediumImpact();
    
    // Simulate network delay for effect
    await Future.delayed(const Duration(seconds: 2));
    
    setState(() {
      _isLoading = false;
    });
    
    // In a real app we would navigate here:
    // Navigator.pushReplacementNamed(context, '/student');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      body: Stack(
        children: [
          // Animated Background Orb 1
          Positioned(
            top: -100,
            left: -100,
            child: TweenAnimationBuilder<double>(
              tween: Tween(begin: 0, end: 2 * 3.14159),
              duration: const Duration(seconds: 20),
              builder: (context, value, child) {
                return Transform.rotate(
                  angle: value,
                  child: Container(
                    width: 350,
                    height: 350,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          Colors.indigo.withOpacity(0.3),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          
          // Animated Background Orb 2
          Positioned(
            bottom: -50,
            right: -50,
            child: TweenAnimationBuilder<double>(
              tween: Tween(begin: 2 * 3.14159, end: 0),
              duration: const Duration(seconds: 25),
              builder: (context, value, child) {
                return Transform.rotate(
                  angle: value,
                  child: Container(
                    width: 450,
                    height: 450,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          Colors.deepPurple.withOpacity(0.2),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: FadeTransition(
                  opacity: _fadeAnimation,
                  child: SlideTransition(
                    position: _slideAnimation,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // App Logo & Title
                        const Icon(Icons.blur_on, size: 80, color: Colors.indigoAccent),
                        const SizedBox(height: 24),
                        const Text(
                          'CampusOne',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 38, 
                            fontWeight: FontWeight.w900,
                            letterSpacing: -1,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'The Unified Campus OS',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.white.withOpacity(0.6),
                            letterSpacing: 0.5,
                          ),
                        ),
                        const SizedBox(height: 48),
                        
                        // Glassmorphism Form Container
                        ClipRRect(
                          borderRadius: BorderRadius.circular(24),
                          child: BackdropFilter(
                            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 36),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.03),
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.1),
                                  width: 1.5,
                                ),
                              ),
                              child: Column(
                                children: [
                                  // Email Field
                                  TextFormField(
                                    style: const TextStyle(color: Colors.white),
                                    decoration: InputDecoration(
                                      labelText: 'University ID / Email',
                                      labelStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                                      prefixIcon: Icon(Icons.person_outline, color: Colors.indigoAccent.withOpacity(0.7)),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(16),
                                        borderSide: BorderSide.none,
                                      ),
                                      filled: true,
                                      fillColor: Colors.black.withOpacity(0.4),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(16),
                                        borderSide: const BorderSide(color: Colors.indigoAccent, width: 1.5),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 20),
                                  
                                  // Password Field
                                  TextFormField(
                                    obscureText: true,
                                    style: const TextStyle(color: Colors.white),
                                    decoration: InputDecoration(
                                      labelText: 'Password',
                                      labelStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                                      prefixIcon: Icon(Icons.lock_outline, color: Colors.indigoAccent.withOpacity(0.7)),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(16),
                                        borderSide: BorderSide.none,
                                      ),
                                      filled: true,
                                      fillColor: Colors.black.withOpacity(0.4),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(16),
                                        borderSide: const BorderSide(color: Colors.indigoAccent, width: 1.5),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  
                                  Align(
                                    alignment: Alignment.centerRight,
                                    child: TextButton(
                                      onPressed: () {},
                                      child: const Text('Forgot Password?', style: TextStyle(color: Colors.indigoAccent)),
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  
                                  // Login Button
                                  SizedBox(
                                    width: double.infinity,
                                    height: 56,
                                    child: ElevatedButton(
                                      onPressed: _isLoading ? null : _handleLogin,
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.indigoAccent,
                                        foregroundColor: Colors.white,
                                        elevation: 8,
                                        shadowColor: Colors.indigoAccent.withOpacity(0.5),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(16),
                                        ),
                                      ),
                                      child: _isLoading
                                          ? const SizedBox(
                                              width: 24,
                                              height: 24,
                                              child: CircularProgressIndicator(
                                                color: Colors.white,
                                                strokeWidth: 2.5,
                                              ),
                                            )
                                          : const Text(
                                              'Secure Login',
                                              style: TextStyle(
                                                fontSize: 16,
                                                fontWeight: FontWeight.bold,
                                                letterSpacing: 1,
                                              ),
                                            ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        
                        const SizedBox(height: 40),
                        // Biometric/Alternative Login Option
                        Center(
                          child: TextButton.icon(
                            onPressed: () {},
                            icon: const Icon(Icons.fingerprint, color: Colors.indigoAccent, size: 28),
                            label: const Text(
                              'Login with Biometrics',
                              style: TextStyle(color: Colors.white70, fontSize: 16),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
