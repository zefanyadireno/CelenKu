import { 
  PiggyBank, 
  Plus, 
  Target, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DepositToSavingDialog } from './DepositToSavingDialog';
import { SavingStatisticsDialog } from './SavingStatisticsDialog';
import { AddNewSavingDialog } from './AddNewSavingDialog';
import { Transaction } from '../App';

interface SavingPageProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>) => void;
}

export function SavingPage({ onAddTransaction }: SavingPageProps) {
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [statisticsDialogOpen, setStatisticsDialogOpen] = useState(false);
  const [addNewSavingOpen, setAddNewSavingOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<typeof savingGoals[0] | null>(null);
  const [savingGoals, setSavingGoals] = useState([
    {
      id: 1,
      name: 'Liburan ke Bali',
      target: 5000000,
      current: 3250000,
      deadline: '31 Des 2025',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Laptop Baru',
      target: 15000000,
      current: 8500000,
      deadline: '30 Jun 2026',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Dana Darurat',
      target: 10000000,
      current: 4750000,
      deadline: '31 Des 2026',
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Motor Baru',
      target: 20000000,
      current: 2500000,
      deadline: '31 Des 2027',
      color: 'bg-orange-500'
    },
  ]);

  const totalSavings = savingGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTargets = savingGoals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSavings / totalTargets) * 100;

  const handleDeposit = (goalId: number, amount: number) => {
    const goal = savingGoals.find(g => g.id === goalId);
    setSavingGoals(goals => 
      goals.map(goal => 
        goal.id === goalId 
          ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
          : goal
      )
    );
    
    if (goal) {
      onAddTransaction({
        type: 'saving',
        name: `Setor ke ${goal.name}`,
        amount: -amount,
        category: 'Tabungan',
      });
    }
  };

  const handleOpenDeposit = (goal: typeof savingGoals[0]) => {
    setSelectedGoal(goal);
    setDepositDialogOpen(true);
  };

  const handleAddNewSaving = (newSaving: {
    name: string;
    target: number;
    deadline: string;
    color: string;
  }) => {
    const newId = Math.max(...savingGoals.map(g => g.id), 0) + 1;
    setSavingGoals(goals => [
      ...goals,
      {
        id: newId,
        ...newSaving,
        current: 0,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-300 to-rose-400 px-6 pt-12 pb-24">
        <h2 className="text-white mb-2">Tabungan Saya</h2>
        <p className="text-rose-50">Wujudkan impian dengan menabung</p>
      </div>

      {/* Summary Card */}
      <div className="px-6 -mt-16 mb-6">
        <Card className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1691302174364-1958bc3d3ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcGlnZ3klMjBiYW5rfGVufDF8fHx8MTc2MDUxMDYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Piggy Bank"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Total Tabungan</p>
              <h2 className="text-gray-900">Rp {totalSavings.toLocaleString('id-ID')}</h2>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress Keseluruhan</span>
              <span className="text-rose-500">{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500 mb-1">Target Total</p>
              <p className="text-gray-900">Rp {totalTargets.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Tujuan Aktif</p>
              <p className="text-gray-900">{savingGoals.length} Tujuan</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-rose-400 hover:bg-rose-500 gap-2 h-auto py-4"
            onClick={() => setAddNewSavingOpen(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Tabungan Baru</span>
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 h-auto py-4"
            onClick={() => setStatisticsDialogOpen(true)}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Statistik</span>
          </Button>
        </div>
      </div>

      {/* Saving Goals */}
      <div className="px-6">
        <h3 className="text-gray-900 mb-4">Tujuan Tabungan</h3>
        <div className="space-y-4">
          {savingGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <Card key={goal.id} className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${goal.color} flex items-center justify-center flex-shrink-0`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{goal.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{goal.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Rp {goal.current.toLocaleString('id-ID')} / Rp {goal.target.toLocaleString('id-ID')}
                    </span>
                    <span className="text-rose-500">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenDeposit(goal)}
                  >
                    Detail
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-rose-400 hover:bg-rose-500 gap-2"
                    onClick={() => handleOpenDeposit(goal)}
                  >
                    <Plus className="w-4 h-4" />
                    Setor
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tips Card */}
      <div className="px-6 mt-6 pb-6">
        <Card className="bg-gradient-to-br from-rose-50 to-purple-50 p-5 border-rose-200">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-400 flex items-center justify-center flex-shrink-0">
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Tips Menabung</h3>
              <p className="text-sm text-gray-600">
                Sisihkan 10-20% dari penghasilan setiap bulan untuk mencapai tujuan finansial Anda lebih cepat!
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Dialogs */}
      <DepositToSavingDialog 
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
        savingGoal={selectedGoal}
        onDeposit={handleDeposit}
      />
      <SavingStatisticsDialog
        open={statisticsDialogOpen}
        onOpenChange={setStatisticsDialogOpen}
        savingGoals={savingGoals}
      />
      <AddNewSavingDialog
        open={addNewSavingOpen}
        onOpenChange={setAddNewSavingOpen}
        onAddSaving={handleAddNewSaving}
      />
    </div>
  );
}