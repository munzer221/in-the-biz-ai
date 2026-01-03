class AdService {
  static final AdService _instance = AdService._internal();
  factory AdService() => _instance;
  AdService._internal();

  Future<void> initialize() async {
    // No-op for web
  }

  Future<void> showInterstitialAd() async {
    // No-op for web
  }
}
