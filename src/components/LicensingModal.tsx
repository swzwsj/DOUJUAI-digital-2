import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, FileText, ChevronRight, ShieldCheck, Sparkles, AlertCircle, Calendar, Hash, Award } from 'lucide-react';
import { Actor, Booking } from '../types';

interface LicensingModalProps {
  actor: Actor;
  onClose: () => void;
  onAddBooking: (booking: Omit<Booking, 'id' | 'bookingId' | 'date' | 'licenseNo'>) => void;
}

export default function LicensingModal({ actor, onClose, onAddBooking }: LicensingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [licenseType, setLicenseType] = useState<'single' | 'annual' | 'buyout'>('annual');
  const [signerName, setSignerName] = useState<string>('');
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
  const [generatedLicense, setGeneratedLicense] = useState<{
    licenseNo: string;
    hash: string;
    date: string;
  } | null>(null);

  // Dynamic price calculation
  const getLicensePrice = () => {
    switch (licenseType) {
      case 'single':
        return Math.round(actor.licensingPrice * 0.3); // 30% of annual base
      case 'annual':
        return actor.licensingPrice;
      case 'buyout':
        return Math.round(actor.licensingPrice * 3.5); // 350% of annual base
      default:
        return actor.licensingPrice;
    }
  };

  const getLicenseDuration = () => {
    switch (licenseType) {
      case 'single':
        return '单次单一作品授权 (拍摄并上线后永久归档)';
      case 'annual':
        return '平台标准年度授权 (签署日起共365自然日)';
      case 'buyout':
        return '平台终身排他买断 (永久合法排他肖像权)';
      default:
        return '一年期授权';
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!signerName.trim() || !hasAcceptedTerms) return;

      // Generate mock secure license values
      const randomHash = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('').toUpperCase();
      const randomLicenseNo = `LIC-${Math.floor(100000 + Math.random() * 900000)}`;
      const todayString = new Date().toISOString().split('T')[0];

      setGeneratedLicense({
        licenseNo: randomLicenseNo,
        hash: `SHA256:0x${randomHash}`,
        date: todayString,
      });

      // Invoke parent callback to record booking
      onAddBooking({
        actorId: actor.id,
        actorName: actor.name,
        actorAvatar: actor.avatar,
        licenseType: licenseType,
        price: getLicensePrice(),
        status: 'active',
        duration: getLicenseDuration(),
      });

      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 overflow-y-auto" id="licensing-modal-overlay">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={step === 3 ? undefined : onClose} />

      {/* Wizard Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_20px_50px_rgba(227,179,65,0.15)] z-10"
        id="licensing-wizard-container"
      >
        {/* Header indicator (hidden for step 3 certificate to stay premium) */}
        {step < 3 && (
          <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between" id="licensing-wizard-header">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-bold text-white">肖像合规确权确认流</h4>
                <p className="text-[10px] text-zinc-500 font-mono">STEP {step} OF 2: {step === 1 ? '选择授权级别' : '签署法律协议'}</p>
              </div>
            </div>
            
            <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-850 text-zinc-500 hover:text-white transition-all">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8" id="licensing-wizard-body">
          {/* STEP 1: License type and pricing selection */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in" id="licensing-step-1">
              <div>
                <h5 className="text-sm font-bold text-white mb-2">1. 选择授权类别与期限</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  授权类别决定了您可将演员肖像用于商业推广或AI训练的覆盖范围。价格基于该演员的平台标准定价计算。
                </p>
              </div>

              {/* Dynamic options grid */}
              <div className="grid grid-cols-1 gap-3">
                {/* Single project Option */}
                <button
                  onClick={() => setLicenseType('single')}
                  className={`p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                    licenseType === 'single'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">单次 / 单一微电影项目</span>
                      {licenseType === 'single' && <span className="text-[9px] bg-amber-500 text-black font-extrabold px-1.5 py-0.5 rounded">已选</span>}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      适合单部短剧、单次广告拍摄。授权在指定单一部作品上映，不限平台。
                    </p>
                  </div>
                  <div className="text-right font-mono shrink-0">
                    <span className="text-xs text-zinc-500 font-normal">价格修正值 0.3x</span>
                    <p className="text-base font-black text-amber-400 mt-1">
                      ￥{Math.round(actor.licensingPrice * 0.3).toLocaleString()}
                    </p>
                  </div>
                </button>

                {/* Annual licensing option */}
                <button
                  onClick={() => setLicenseType('annual')}
                  className={`p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                    licenseType === 'annual'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">平台标准年度授权 (1年不限次数)</span>
                      {licenseType === 'annual' && <span className="text-[9px] bg-amber-500 text-black font-extrabold px-1.5 py-0.5 rounded">已选</span>}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      适合持续创作团队。授权期内可制作无限部作品，覆盖短剧、AI面捕、高端代言及出海推广。
                    </p>
                  </div>
                  <div className="text-right font-mono shrink-0">
                    <span className="text-xs text-zinc-500 font-normal">基准价格 1.0x</span>
                    <p className="text-base font-black text-amber-400 mt-1">
                      ￥{actor.licensingPrice.toLocaleString()}
                    </p>
                  </div>
                </button>

                {/* Exclusive Buyout option */}
                <button
                  onClick={() => setLicenseType('buyout')}
                  className={`p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                    licenseType === 'buyout'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">肖像权买断及排他限制 (终身/全球)</span>
                      {licenseType === 'buyout' && <span className="text-[9px] bg-amber-500 text-black font-extrabold px-1.5 py-0.5 rounded">已选</span>}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      适合独家大IP定制或永久企业形象代言。该演员肖像在全球范围内对竞争品牌永久不可再授权。
                    </p>
                  </div>
                  <div className="text-right font-mono shrink-0">
                    <span className="text-xs text-zinc-500 font-normal">重算乘数 3.5x</span>
                    <p className="text-base font-black text-amber-400 mt-1">
                      ￥{Math.round(actor.licensingPrice * 3.5).toLocaleString()}
                    </p>
                  </div>
                </button>
              </div>

              {/* Security info disclaimer */}
              <div className="flex gap-2.5 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400">
                <AlertCircle className="h-4.5 w-4.5 text-[#E3B341] shrink-0" />
                <p className="leading-relaxed">
                  所有价格包含平台数字版权确权和自动智能审计费。交易资金由平台双向监管托管，确认作品制作合规后，才会分期转账至演员指定信托账户。
                </p>
              </div>

              {/* Next Button Step 1 */}
              <div className="pt-4 flex justify-end" id="step-1-next">
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 bg-[#E3B341] hover:bg-amber-500 text-black px-6 py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(227,179,65,0.15)] transition-all"
                >
                  <span>下一步：预览与签署协议</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Agreement scroll preview and electronic signing */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in" id="licensing-step-2">
              <div>
                <h5 className="text-sm font-bold text-white mb-2">2. 预览《数字肖像权许可及版权声明协议》</h5>
                <p className="text-xs text-zinc-400">
                  请仔细审阅以下电子签署大纲条款，并在最下方完成电子签章确认。
                </p>
              </div>

              {/* Legal Agreement Text Box */}
              <div className="h-48 overflow-y-auto bg-zinc-950 p-4 border border-zinc-900 rounded-xl text-[10px] text-zinc-500 space-y-3.5 leading-relaxed font-mono">
                <h6 className="text-xs font-bold text-zinc-300 text-center uppercase tracking-wide border-b border-zinc-900 pb-2">《数字肖像合法合规授权协议大纲》</h6>
                <p>
                  <strong>第一条 释义与确权标的：</strong>
                  本协议下许可使用之确权标的，为入库演员 <strong>{actor.name}</strong> 的全部高清正面照片、3D面部多边形拓扑网格模型、10秒语音拟真特征样本。
                </p>
                <p>
                  <strong>第二条 授权模式（{licenseType === 'single' ? '单次作品授权' : licenseType === 'annual' ? '平台标准年包授权' : '排他垄断买断'}）：</strong>
                  许可方（平台经纪代理）代表 <strong>{actor.name}</strong>，永久无保留承诺本平台肖像具有不可篡改之原生态合法产权。被许可方在本协议约定的授权期限和范围内，有权利用高保真AI、数字分身、实时语音克隆对授权肖像进行二次视频、海报创作及线上推介。
                </p>
                <p>
                  <strong>第三条 肖像合规规范限制：</strong>
                  被许可方严正承诺，绝对不利用本授权肖像在任何成人内容、非法欺诈、政治宗教、带有种族侮辱之违法违规广告中。所有生成内容需在平台配备的数字安全合规检测系统进行审查备案（生成水印标识），如有发生违反规定之言行，授权自动作废并追偿人民币5,000,000.00元违约金。
                </p>
                <p>
                  <strong>第四条 资金信托双向托管：</strong>
                  本次肖像许可费用 ￥{getLicensePrice().toLocaleString()}，被许可方签署即代表全额汇缴至平台在华夏商业银行开设的信托保管账户。项目初审合格、交片无异议后，按30%、50%、20%三期自动发放。
                </p>
                <p className="text-center text-zinc-600">— 协议大纲完结，签署代表双方真实意愿 —</p>
              </div>

              {/* Signature Input */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">被授权企业 / 经办人电子签名签署 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="请输入真实签名姓名 (如: 横店影业、张导演)"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                  />
                </div>

                {/* Accept Terms Checkbox */}
                <button
                  type="button"
                  onClick={() => setHasAcceptedTerms(!hasAcceptedTerms)}
                  className="flex items-start gap-2 text-left"
                >
                  <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                    hasAcceptedTerms ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-800 bg-zinc-900'
                  }`}>
                    {hasAcceptedTerms && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-relaxed">
                    我已仔细阅读并同意《数字肖像合法合规授权协议大纲》条款，承诺合法安全地利用本数智资产。
                  </span>
                </button>
              </div>

              {/* Buttons Row Step 2 */}
              <div className="pt-4 border-t border-zinc-900 flex justify-between" id="step-2-buttons">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-zinc-500 hover:text-white transition-all font-semibold"
                >
                  上一步
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!signerName.trim() || !hasAcceptedTerms}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_4px_12px_rgba(227,179,65,0.15)] ${
                    signerName.trim() && hasAcceptedTerms
                      ? 'bg-[#E3B341] hover:bg-amber-500 text-black cursor-pointer'
                      : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-850'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>签署确认 · 确认支付</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: High Fidelity Certificate Presentation */}
          {step === 3 && generatedLicense && (
            <div className="space-y-8 animate-fade-in" id="licensing-step-3">
              {/* Premium Certificate Graphic */}
              <div className="border-4 border-double border-amber-500/40 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl p-6 sm:p-8 relative shadow-[0_15px_40px_rgba(0,0,0,0.8)]" id="license-certificate">
                
                {/* Visual accents */}
                <div className="absolute top-5 right-5 z-25 text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono shadow-inner">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>已签署 (ACTIVE)</span>
                </div>

                {/* Banner watermark */}
                <div className="absolute -bottom-10 -right-10 text-[120px] font-bold text-zinc-900/10 font-mono tracking-widest pointer-events-none uppercase">
                  VERIFIED
                </div>

                <div className="text-center border-b border-zinc-800/80 pb-5 mb-5">
                  <div className="inline-flex p-2 bg-amber-500/10 rounded-2xl text-amber-400 mb-2.5">
                    <Award className="h-7 w-7" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-widest uppercase font-mono">
                    肖像数字资产使用许可证
                  </h4>
                  <p className="text-[9px] text-zinc-500 font-mono tracking-wider mt-1 uppercase">
                    PORTRAIT DIGITAL ASSET LICENSE CERTIFICATE
                  </p>
                </div>

                {/* Detailed Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono" id="certificate-details-table">
                  <div className="space-y-2 pb-2 sm:border-r border-zinc-900 pr-2">
                    <div>
                      <span className="text-zinc-600 text-[10px] uppercase block">授权许可证号</span>
                      <strong className="text-white font-mono">{generatedLicense.licenseNo}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] uppercase block">版权人 (授权演员)</span>
                      <strong className="text-amber-400">{actor.name}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] uppercase block">被授权单位 / 签名</span>
                      <strong className="text-white">{signerName}</strong>
                    </div>
                  </div>

                  <div className="space-y-2 sm:pl-4">
                    <div>
                      <span className="text-zinc-600 text-[10px] uppercase block">授权类别 / 期限</span>
                      <strong className="text-white">{getLicenseDuration().split(' ')[0]}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] uppercase block">授权费用 (信托双向托管)</span>
                      <strong className="text-emerald-400">￥{getLicensePrice().toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] uppercase block">确权数字日期</span>
                      <strong className="text-white">{generatedLicense.date}</strong>
                    </div>
                  </div>
                </div>

                {/* Blockchain metadata */}
                <div className="mt-6 pt-4 border-t border-zinc-850 bg-zinc-950/80 p-3 rounded-2xl flex items-center justify-between font-mono text-[9px]">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Hash className="h-3 w-3 text-amber-500 shrink-0" />
                    <span className="truncate max-w-[280px]">确权链哈希: {generatedLicense.hash}</span>
                  </div>
                  <span className="text-[#E3B341] font-bold">由DOUJU数字安全链提供安全审计</span>
                </div>
              </div>

              {/* Congratulatory note */}
              <div className="text-center max-w-md mx-auto" id="license-congrats">
                <div className="inline-flex p-1.5 bg-emerald-500/10 rounded-xl text-emerald-400 mb-2">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <h5 className="text-sm font-bold text-white">肖像合规授权签署并托管成功！</h5>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  您的合同已永久同步至“个人主页 - 我的授权”。您现在即可合法在您的AI生成模型及影视微剧目中调取其对应肖像素材。
                </p>
              </div>

              {/* Done / Download button */}
              <div className="pt-2 flex justify-center" id="certificate-done">
                <button
                  onClick={onClose}
                  className="bg-[#E3B341] hover:bg-amber-500 text-black px-8 py-3 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(227,179,65,0.2)] transition-all font-mono"
                >
                  关闭返回
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
