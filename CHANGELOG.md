# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- 特に無し

## [1.0.2] - 2025-05-17

### Fixed

- 「改行スペースを一括追加（Markdown）」機能の仕様を改善：
  - リスト（`- `など）で始まる行について、**次の行がリストでない場合には文末にスペース2つを補完**するよう変更
  - 通常行についても、行末スペースの有無をより正確に判定するよう改善
  - コード、引用、HTMLなどの構文は引き続き自動除外

## [1.0.1] - 2025-05-17

### Added

- 「改行スペースを一括追加（Markdown）」コマンドを追加

## [1.0.0] - 2025-01-01

### Added

- 最初のリリース