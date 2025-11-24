import { TrendingUp, Calendar, Target, DollarSign, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SavingStatisticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savingGoals: Array<{
    id: number;
    name: string;
    target: number;
    current: number;
    deadline: string;
    color: string;
  }>;
}

export function SavingStatisticsDialog({ 
  open, 
  onOpenChange,
  savingGoals 
}: SavingStatisticsDialogProps) {
  const totalSavings = savingGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTargets = savingGoals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSavings / totalTargets) * 100;
  
  // Calculate monthly average (mock data)
  const monthlyDeposits = [
    { month: 'Sep', amount: 850000 },
    { month: 'Okt', amount: 1200000 },
    { month: 'Nov', amount: 950000 },
  ];
  
  const avgMonthlyDeposit = monthlyDeposits.reduce((sum, d) => sum + d.amount, 0) / monthlyDeposits.length;
  
  // Calculate estimated completion
  const remainingAmount = totalTargets - totalSavings;
  const estimatedMonths = Math.ceil(remainingAmount / avgMonthlyDeposit);
  
  // Goals by status
  const onTrackGoals = savingGoals.filter(g => (g.current / g.target) >= 0.5).length;
  const needsAttention = savingGoals.length - onTrackGoals;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            Statistik Tabungan
          </DialogTitle>
          <DialogDescription>
            Analisis lengkap performa tabungan Anda
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="goals">Tujuan</TabsTrigger>
            <TabsTrigger value="trends">Tren</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Tabungan</p>
                    <p className="text-gray-900">Rp {totalSavings.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Target</p>
                    <p className="text-gray-900">Rp {totalTargets.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rata-rata/Bulan</p>
                    <p className="text-gray-900">Rp {avgMonthlyDeposit.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Estimasi Selesai</p>
                    <p className="text-gray-900">{estimatedMonths} Bulan</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Overall Progress */}
            <Card className="p-4">
              <h3 className="text-gray-900 mb-3">Progress Keseluruhan</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Rp {totalSavings.toLocaleString('id-ID')} dari Rp {totalTargets.toLocaleString('id-ID')}
                  </span>
                  <span className="text-rose-500">{overallProgress.toFixed(1)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </Card>

            {/* Goals Status */}
            <Card className="p-4">
              <h3 className="text-gray-900 mb-3">Status Tujuan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{onTrackGoals}</p>
                    <p className="text-sm text-gray-500">On Track</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{needsAttention}</p>
                    <p className="text-sm text-gray-500">Perlu Perhatian</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-3">
            {savingGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              const remaining = goal.target - goal.current;
              return (
                <Card key={goal.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full ${goal.color} flex items-center justify-center`}>
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{goal.name}</p>
                      <p className="text-xs text-gray-500">{goal.deadline}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Rp {goal.current.toLocaleString('id-ID')}
                      </span>
                      <span className="text-rose-500">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Sisa: Rp {remaining.toLocaleString('id-ID')}</span>
                      <span>Target: Rp {goal.target.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <Card className="p-4">
              <h3 className="text-gray-900 mb-4">Setoran Bulanan</h3>
              <div className="space-y-3">
                {monthlyDeposits.map((deposit, index) => {
                  const maxDeposit = Math.max(...monthlyDeposits.map(d => d.amount));
                  const barWidth = (deposit.amount / maxDeposit) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{deposit.month} 2025</span>
                        <span className="text-gray-900">Rp {deposit.amount.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-rose-400 to-purple-400 h-3 rounded-full transition-all"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Performa Bagus! 📈</h3>
                  <p className="text-sm text-gray-600">
                    Setoran bulan ini meningkat <strong>26%</strong> dibanding bulan lalu. 
                    Terus pertahankan konsistensi menabung!
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-gray-900 mb-3">Proyeksi Target</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Dengan rata-rata setoran <strong>Rp {avgMonthlyDeposit.toLocaleString('id-ID')}</strong> per bulan:
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    🎯 Anda akan mencapai <strong>semua target</strong> dalam <strong>{estimatedMonths} bulan</strong>
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
