import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'dart:ui' as ui;
import 'dart:typed_data';

/// Take a screenshot of a widget and save it to a file
Future<void> takeScreenshot(
  GlobalKey key,
  String filename,
) async {
  try {
    RenderRepaintBoundary boundary =
        key.currentContext!.findRenderObject() as RenderRepaintBoundary;
    ui.Image image = await boundary.toImage(pixelRatio: 3.0);
    ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    if (byteData != null) {
      final file = File('store-assets/screenshots/$filename');
      await file.create(recursive: true);
      await file.writeAsBytes(byteData.buffer.asUint8List());
      print('✅ Screenshot saved: $filename');
    }
  } catch (e) {
    print('❌ Error taking screenshot: $e');
  }
}
