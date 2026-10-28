import sys
import json
import base64
import io
from pathlib import Path
import qrcode
from playwright.sync_api import sync_playwright

def generate_qr_base64(data_text: str) -> str:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=8,
        border=2,
    )
    qr.add_data(data_text)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#064e3b", back_color="white")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")

def build_voucher_html(booking: dict, property_info: dict) -> str:
    booking_id = booking.get("id", "HJ-88912")
    guest_name = booking.get("guestName", "النزيل الكريم")
    guest_phone = booking.get("guestPhone", "+963 9XX XXX XXX")
    hotel_title = property_info.get("title", "فيلا ومزرعة سيران الملكية")
    area = property_info.get("area", "بلودان")
    governorate = property_info.get("governorate", "ريف دمشق")
    check_in = booking.get("checkIn", "2026-10-15")
    check_out = booking.get("checkOut", "2026-10-18")
    nights = booking.get("nights", 3)
    total_usd = booking.get("totalPriceUsd", 240)
    total_syp = booking.get("totalPriceSyp", 3600000)
    deposit_usd = booking.get("depositUsd", int(total_usd * 0.25))
    remaining_usd = total_usd - deposit_usd

    qr_text = f"SEYRAN-VERIFY|ID:{booking_id}|GUEST:{guest_name}|PROP:{hotel_title}|TOTAL:{total_usd}$|STATUS:CONFIRMED"
    qr_b64 = generate_qr_base64(qr_text)

    html = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
  @page {{
    size: A4 portrait;
    margin: 15mm;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    font-family: 'Cairo', system-ui, -apple-system, sans-serif;
    color: #0f172a;
    background: #ffffff;
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }}
  .voucher-container {{
    border: 2px solid #059669;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }}
  .header {{
    background: linear-gradient(135deg, #065f46 0%, #047857 50%, #0f172a 100%);
    color: white;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .brand-title {{
    font-size: 26px;
    font-weight: 900;
    letter-spacing: -0.5px;
    margin: 0;
  }}
  .brand-sub {{
    font-size: 13px;
    color: #a7f3d0;
    margin-top: 4px;
  }}
  .badge {{
    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.3);
    color: #fef08a;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
  }}
  .content {{
    padding: 30px;
  }}
  .ref-bar {{
    background: #f0fdf4;
    border: 1px dashed #059669;
    border-radius: 16px;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }}
  .ref-id {{
    font-size: 20px;
    font-weight: 900;
    color: #065f46;
    font-family: monospace;
  }}
  .grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 25px;
  }}
  .box {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 16px;
  }}
  .box-label {{
    font-size: 11px;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
  }}
  .box-val {{
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin-top: 4px;
  }}
  .financial-card {{
    background: #f1f5f9;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 25px;
  }}
  .fin-row {{
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #e2e8f0;
    font-size: 14px;
  }}
  .fin-row.total {{
    border-bottom: none;
    padding-top: 10px;
    font-size: 16px;
    font-weight: 900;
    color: #047857;
  }}
  .footer-flex {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
    padding-top: 20px;
  }}
  .qr-box {{
    text-align: center;
  }}
  .qr-img {{
    width: 120px;
    height: 120px;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
  }}
  .guarantee-note {{
    font-size: 12px;
    color: #475569;
    max-width: 360px;
  }}
  .stamp {{
    display: inline-block;
    padding: 4px 10px;
    border: 2px solid #059669;
    color: #059669;
    font-weight: 900;
    border-radius: 8px;
    font-size: 11px;
    margin-top: 10px;
    transform: rotate(-3deg);
  }}
</style>
</head>
<body>

<div class="voucher-container">
  <div class="header">
    <div>
      <h1 class="brand-title">سيران سوريا • Seyran Syria</h1>
      <div class="brand-sub">سند تأكيد الحجز السياحي الإلكتروني المعتمد</div>
    </div>
    <div>
      <span class="badge">حجز مؤكد ومضمون VIP</span>
    </div>
  </div>

  <div class="content">
    <div class="ref-bar">
      <div>
        <div style="font-size:12px; color:#64748b;">رقم المعاملة المرجعي (Booking Ref):</div>
        <div class="ref-id">#{booking_id}</div>
      </div>
      <div style="text-align: left;">
        <span style="background:#dcfce7; color:#15803d; font-weight:800; padding:6px 14px; border-radius:9999px; font-size:12px;">
          ✓ تم سداد عربون الضمان (Escrow)
        </span>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <div class="box-label">بيانات النزيل الرئيسي</div>
        <div class="box-val">{guest_name}</div>
        <div style="font-size:12px; color:#64748b; margin-top:2px;">الهاتف: {guest_phone}</div>
      </div>
      <div class="box">
        <div class="box-label">العقار أو الفندق المحجوز</div>
        <div class="box-val">{hotel_title}</div>
        <div style="font-size:12px; color:#64748b; margin-top:2px;">المنطقة: {area} - {governorate}</div>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <div class="box-label">تاريخ تسجيل الوصول (Check-in)</div>
        <div class="box-val">{check_in}</div>
        <div style="font-size:11px; color:#059669;">ابتداءً من الساعة 02:00 ظهراً</div>
      </div>
      <div class="box">
        <div class="box-label">تاريخ تسجيل المغادرة (Check-out)</div>
        <div class="box-val">{check_out} ({nights} ليالٍ)</div>
        <div style="font-size:11px; color:#059669;">حتى الساعة 12:00 ظهراً</div>
      </div>
    </div>

    <div class="financial-card">
      <div style="font-weight:800; font-size:13px; margin-bottom:10px; color:#334155;">جدول السداد المالي والضمان (Escrow Breakdown):</div>
      <div class="fin-row">
        <span>قيمة الإقامة الإجمالية:</span>
        <span style="font-weight:700;">${total_usd} USD ({total_syp:,} ل.س)</span>
      </div>
      <div class="fin-row">
        <span>عربون الضمان المحفوظ لدى سيران سوريا (25%):</span>
        <span style="color:#059669; font-weight:700;">${deposit_usd} USD (مسدد بالكامل)</span>
      </div>
      <div class="fin-row total">
        <span>المبلغ المتبقي واجب السداد عند الوصول نقداً للمضيف:</span>
        <span>${remaining_usd} USD</span>
      </div>
    </div>

    <div class="footer-flex">
      <div class="guarantee-note">
        <strong>ضمان سيران سوريا الميداني:</strong>
        <p style="margin:4px 0 0 0; font-size:11px; color:#64748b;">
          هذا الحجز مغطى بنظام الضمان المالي الكامل. لا يتم تسليم المضيف مستحقاته إلا بعد فحص العقار من قبلك والتحقق من توفر منظومة الطاقة الشمسية والمسبح والإنترنت كما هو موصوف.
        </p>
        <div class="stamp">✓ VERIFIED & SECURED BY SEYRAN ESCROW</div>
      </div>

      <div class="qr-box">
        <img class="qr-img" src="data:image/png;base64,{qr_b64}" alt="Verification QR Code">
        <div style="font-size:10px; color:#64748b; margin-top:4px;">امسح للتحقق الرقمي الفوري</div>
      </div>
    </div>

  </div>
</div>

</body>
</html>"""
    return html

def generate_pdf(booking: dict, property_info: dict, output_path: str):
    html_content = build_voucher_html(booking, property_info)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_content(html_content, wait_until="load", timeout=10000)
        pdf_bytes = page.pdf(format="A4", print_background=True)
        browser.close()
    
    with open(output_path, "wb") as f:
        f.write(pdf_bytes)
    return output_path

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Load from JSON file or argument
        arg = sys.argv[1]
        out_file = sys.argv[2] if len(sys.argv) > 2 else "voucher.pdf"
        try:
            with open(arg, "r", encoding="utf-8") as f:
                data = json.load(f)
            booking = data.get("booking", {})
            property_info = data.get("property", {})
            generate_pdf(booking, property_info, out_file)
            print(f"SUCCESS:{out_file}")
        except Exception as e:
            print(f"ERROR:{e}", file=sys.stderr)
            sys.exit(1)
    else:
        # Demo generation
        demo_booking = {
            "id": "BK-2026-9901",
            "guestName": "م. باسل الحموي",
            "guestPhone": "+963 944 123 456",
            "checkIn": "2026-10-20",
            "checkOut": "2026-10-23",
            "nights": 3,
            "totalPriceUsd": 350,
            "totalPriceSyp": 5250000,
            "depositUsd": 88
        }
        demo_prop = {
            "title": "فيلا النخيل الفاخرة مع مسبح خاص وطاقة شمسية 24/7",
            "area": "كسب",
            "governorate": "اللاذقية"
        }
        out = "demo_voucher.pdf"
        generate_pdf(demo_booking, demo_prop, out)
        print(f"SUCCESS:{out}")
